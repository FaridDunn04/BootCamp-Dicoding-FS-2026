import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  createBook,
  deleteBook,
  getBooks,
  updateBook,
} from '../api/books';
import useDebouncedValue from './useDebouncedValue';
import useTimedNotice from './useTimedNotice';
import {
  createEditForm,
  initialBookForm,
  initialFilters,
  normalizeBookForm,
} from '../utils/bookshelfForms';

const useBookshelf = () => {
  const [books, setBooks] = useState([]);
  const [bookForm, setBookForm] = useState(initialBookForm);
  const [editForm, setEditForm] = useState(initialBookForm);
  const [filters, setFilters] = useState(initialFilters);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const { notice, showNotice } = useTimedNotice();
  const debouncedFilters = useDebouncedValue(filters, 300);

  const selectedBook = useMemo(
    () => books.find((book) => book.id === selectedBookId) || null,
    [books, selectedBookId]
  );

  const loadBooks = useCallback(async (activeFilters) => {
    try {
      const result = await getBooks(activeFilters);
      setBooks(result.data.books);
    } catch {
      showNotice('error', 'Gagal mengambil data buku dari server.');
    }
  }, [showNotice]);

  useEffect(() => {
    const id = window.setTimeout(() => {
      void loadBooks(debouncedFilters);
    }, 0);

    return () => window.clearTimeout(id);
  }, [debouncedFilters, loadBooks]);

  const updateBookFormField = (event) => {
    const { name, type, checked, value } = event.target;

    setBookForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const updateEditFormField = (event) => {
    const { name, type, checked, value } = event.target;

    setEditForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const updateFilterField = (event) => {
    const { name, value } = event.target;

    setFilters((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const clearFilters = () => {
    setFilters(initialFilters);
  };

  const resetBookForm = () => {
    setBookForm(initialBookForm);
  };

  const submitCreateBook = async (event) => {
    event.preventDefault();

    const payload = normalizeBookForm(bookForm);
    const result = await createBook(payload);

    if (result.status === 'success') {
      showNotice('success', 'Buku berhasil ditambahkan.');
      resetBookForm();
      await loadBooks(filters);
      return;
    }

    showNotice('error', result.message || 'Gagal menambahkan buku.');
  };

  const openEditModal = (book) => {
    setSelectedBookId(book.id);
    setEditForm(createEditForm(book));
  };

  const closeEditModal = () => {
    setSelectedBookId(null);
    setEditForm(initialBookForm);
  };

  const submitEditBook = async (event) => {
    event.preventDefault();

    if (!selectedBook) {
      return;
    }

    const payload = normalizeBookForm(editForm);
    const result = await updateBook(selectedBook.id, payload);

    if (result.status === 'success') {
      showNotice('success', 'Buku berhasil diperbarui.');
      closeEditModal();
      await loadBooks(filters);
      return;
    }

    showNotice('error', result.message || 'Gagal memperbarui buku.');
  };

  const removeBook = async (bookId) => {
    const result = await deleteBook(bookId);

    if (result.status === 'success') {
      showNotice('success', 'Buku berhasil dihapus.');
      await loadBooks(filters);
      return;
    }

    showNotice('error', result.message || 'Buku gagal dihapus.');
  };

  const finishedBooks = books.filter((book) => book.finished).length;
  const readingBooks = books.filter((book) => book.reading).length;

  return {
    bookForm,
    books,
    clearFilters,
    closeEditModal,
    editForm,
    filters,
    finishedBooks,
    notice,
    openEditModal,
    readingBooks,
    removeBook,
    resetBookForm,
    selectedBook,
    submitCreateBook,
    submitEditBook,
    updateBookFormField,
    updateEditFormField,
    updateFilterField,
  };
};

export default useBookshelf;
