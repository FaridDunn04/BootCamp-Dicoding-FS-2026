const initialBookForm = {
  name: '',
  year: '',
  author: '',
  summary: '',
  publisher: '',
  pageCount: '',
  readPage: '',
  reading: false,
};

const initialFilters = {
  name: '',
  reading: 'all',
};

const normalizeBookForm = (form) => ({
  ...form,
  year: Number(form.year) || 0,
  pageCount: Number(form.pageCount) || 0,
  readPage: Number(form.readPage) || 0,
});

const createEditForm = (book) => ({
  name: book.name ?? '',
  year: book.year ?? '',
  author: book.author ?? '',
  summary: book.summary ?? '',
  publisher: book.publisher ?? '',
  pageCount: book.pageCount ?? '',
  readPage: book.readPage ?? '',
  reading: Boolean(book.reading),
});

export {
  createEditForm,
  initialBookForm,
  initialFilters,
  normalizeBookForm,
};
