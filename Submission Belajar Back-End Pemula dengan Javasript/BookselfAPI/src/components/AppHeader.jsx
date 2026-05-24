function AppHeader({ totalBooks, subtitle }) {
  return (
    <header className="hero-banner">
      <div className="hero-copy">
        <span className="eyebrow">Bookshelf API</span>
        <h1>Rak buku digital yang rapi, santai, dan gampang dipakai.</h1>
        <p>{subtitle}</p>
      </div>

      <div className="hero-card">
        <div>
          <span className="hero-stat-label">Total Koleksi</span>
          <strong className="hero-stat-value">{totalBooks}</strong>
        </div>
        <div className="hero-note">
          Tambah, edit, cari, dan hapus buku tanpa ribet.
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
