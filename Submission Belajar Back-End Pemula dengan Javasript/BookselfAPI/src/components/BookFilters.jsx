function BookFilters({ filters, onChange, onClear }) {
  return (
    <section className="panel filters-panel">
      <div className="panel-head compact">
        <span className="panel-kicker">Cari & Filter</span>
        <h2>Temukan buku yang kamu mau</h2>
      </div>

      <div className="filter-grid">
        <label className="field">
          <span>Cari nama</span>
          <input
            name="name"
            type="text"
            value={filters.name}
            onChange={onChange}
            placeholder="Misal: dicoding"
          />
        </label>

        <label className="field">
          <span>Status baca</span>
          <select name="reading" value={filters.reading} onChange={onChange}>
            <option value="all">Semua</option>
            <option value="true">Sedang dibaca</option>
            <option value="false">Tidak sedang dibaca</option>
          </select>
        </label>

      </div>

      <div className="filter-actions">
        <button type="button" className="btn btn-secondary" onClick={onClear}>
          Bersihkan Filter
        </button>
      </div>
    </section>
  );
}

export default BookFilters;
