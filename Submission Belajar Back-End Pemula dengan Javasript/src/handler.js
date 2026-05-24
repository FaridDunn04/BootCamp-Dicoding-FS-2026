const { nanoid } = require('nanoid');

const books = [];

const addBookHandler = (request, response) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.body;

  if (!name) {
    return response.status(400).json({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
  }

  if (readPage > pageCount) {
    return response.status(400).json({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
  }

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading: reading || false,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  return response.status(201).json({
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: {
      bookId: id,
    },
  });
};

const getAllBooksHandler = (request, response) => {
  const { name, reading, finished } = request.query;

  let filteredBooks = books;

  if (name) {
    filteredBooks = filteredBooks.filter(
      (book) => book.name.toLowerCase().includes(name.toLowerCase()),
    );
  }

  if (reading !== undefined) {
    const readingValue = reading === '1';
    filteredBooks = filteredBooks.filter((book) => book.reading === readingValue);
  }

  if (finished !== undefined) {
    const finishedValue = finished === '1';
    filteredBooks = filteredBooks.filter((book) => book.finished === finishedValue);
  }

  const bookList = filteredBooks.map((book) => ({
    id: book.id,
    name: book.name,
    year: book.year,
    author: book.author,
    summary: book.summary,
    publisher: book.publisher,
    pageCount: book.pageCount,
    readPage: book.readPage,
    finished: book.finished,
    reading: book.reading,
  }));

  return response.status(200).json({
    status: 'success',
    data: {
      books: bookList,
    },
  });
};

const getBookByIdHandler = (request, response) => {
  const { bookId } = request.params;

  const book = books.find((bookItem) => bookItem.id === bookId);

  if (!book) {
    return response.status(404).json({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });
  }

  return response.status(200).json({
    status: 'success',
    data: {
      book,
    },
  });
};

const editBookByIdHandler = (request, response) => {
  const { bookId } = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.body;

  if (!name) {
    return response.status(400).json({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
  }

  if (readPage > pageCount) {
    return response.status(400).json({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
  }

  const bookIndex = books.findIndex((bookItem) => bookItem.id === bookId);

  if (bookIndex === -1) {
    return response.status(404).json({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
  }

  const updatedAt = new Date().toISOString();
  const finished = pageCount === readPage;

  books[bookIndex] = {
    ...books[bookIndex],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    updatedAt,
  };

  return response.status(200).json({
    status: 'success',
    message: 'Buku berhasil diperbarui',
  });
};

const deleteBookByIdHandler = (request, response) => {
  const { bookId } = request.params;

  const bookIndex = books.findIndex((bookItem) => bookItem.id === bookId);

  if (bookIndex === -1) {
    return response.status(404).json({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
  }

  books.splice(bookIndex, 1);

  return response.status(200).json({
    status: 'success',
    message: 'Buku berhasil dihapus',
  });
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};
