function BookCard({ book, onView, onDelete }) {
  const progress = book.pageCount > 0 ? Math.round((book.readPage / book.pageCount) * 100) : 0;

  return (
    <article className="book-card">
      <div className="book-card-top">
        <div>
          <span className="book-tag">{book.year || 'Tahun tidak diketahui'}</span>
          <h3>{book.name}</h3>
          <p>{book.author || 'Penulis belum diisi'}</p>
        </div>
        <span className={`status-chip ${book.finished ? 'is-finished' : book.reading ? 'is-reading' : 'is-unread'}`}>
          {book.finished ? 'Selesai' : book.reading ? 'Sedang dibaca' : 'Belum dibaca'}
        </span>
      </div>

      <p className="book-summary">{book.summary || 'Tidak ada ringkasan.'}</p>

      <div className="book-meta">
        <span>Penerbit: {book.publisher || '-'}</span>
        <span>{book.readPage}/{book.pageCount} halaman</span>
      </div>

      <div className="progress-wrap" aria-label="Progress membaca">
        <div className="progress-bar">
          <span style={{ width: `${progress}%` }} />
        </div>
        <small>{progress}% selesai</small>
      </div>

      <div className="card-actions">
        <button type="button" className="btn btn-secondary" onClick={() => onView(book)}>
          Lihat
        </button>
        <button type="button" className="btn btn-danger" onClick={() => onDelete(book.id)}>
          Hapus
        </button>
      </div>
    </article>
  );
}

export default BookCard;
