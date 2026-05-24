function BookStats({ totalBooks, finishedBooks, readingBooks }) {
  return (
    <section className="stats-grid">
      <article className="stat-card">
        <span>Total Buku</span>
        <strong>{totalBooks}</strong>
      </article>
      <article className="stat-card soft-green">
        <span>Selesai Dibaca</span>
        <strong>{finishedBooks}</strong>
      </article>
      <article className="stat-card soft-orange">
        <span>Sedang Dibaca</span>
        <strong>{readingBooks}</strong>
      </article>
    </section>
  );
}

export default BookStats;
