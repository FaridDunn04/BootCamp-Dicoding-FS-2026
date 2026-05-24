const API_BASE = '/books';

const toQueryString = (filters) => {
  const params = new URLSearchParams();

  if (filters.name) params.set('name', filters.name);
  if (filters.reading !== 'all') params.set('reading', filters.reading);

  const query = params.toString();
  return query ? `?${query}` : '';
};

const getBooks = async (filters = {}) => {
  const response = await fetch(`${API_BASE}${toQueryString(filters)}`);
  return response.json();
};

const getBookById = async (bookId) => {
  const response = await fetch(`${API_BASE}/${bookId}`);
  return response.json();
};

const createBook = async (book) => {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(book),
  });

  return response.json();
};

const updateBook = async (bookId, book) => {
  const response = await fetch(`${API_BASE}/${bookId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(book),
  });

  return response.json();
};

const deleteBook = async (bookId) => {
  const response = await fetch(`${API_BASE}/${bookId}`, {
    method: 'DELETE',
  });

  return response.json();
};

export {
  createBook,
  deleteBook,
  getBooks,
  getBookById,
  updateBook,
};
