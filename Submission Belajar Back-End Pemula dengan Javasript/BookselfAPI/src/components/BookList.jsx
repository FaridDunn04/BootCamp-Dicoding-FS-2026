import BookCard from './BookCard';

function BookList({ books, onView, onDelete }) {
  if (books.length === 0) {
    return (
      <section className="empty-state panel">
        <h3>Belum ada buku</h3>
        <p>Tambahkan buku pertamamu, lalu kelola dengan tampilan yang lebih nyaman.</p>
      </section>
    );
  }

  return (
    <section className="book-grid">
      {books.map((book) => (
        <BookCard key={book.id} book={book} onView={onView} onDelete={onDelete} />
      ))}
    </section>
  );
}

export default BookList;
