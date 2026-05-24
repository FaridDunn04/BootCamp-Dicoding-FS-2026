function BookFields({ form, onChange, showReadPage = true }) {
  return (
    <>
      <label className="field">
        <span>Judul Buku *</span>
        <input
          name="name"
          type="text"
          value={form.name}
          onChange={onChange}
          placeholder="Contoh: Laut Bercerita"
          required
        />
      </label>

      <div className="field-row">
        <label className="field">
          <span>Penulis</span>
          <input
            name="author"
            type="text"
            value={form.author}
            onChange={onChange}
            placeholder="Nama penulis"
          />
        </label>

        <label className="field">
          <span>Penerbit</span>
          <input
            name="publisher"
            type="text"
            value={form.publisher}
            onChange={onChange}
            placeholder="Nama penerbit"
          />
        </label>
      </div>

      <div className="field-row">
        <label className="field">
          <span>Tahun Terbit</span>
          <input
            name="year"
            type="number"
            value={form.year}
            onChange={onChange}
            placeholder="2024"
          />
        </label>

        <label className="field">
          <span>Total Halaman *</span>
          <input
            name="pageCount"
            type="number"
            value={form.pageCount}
            onChange={onChange}
            min="1"
            required
          />
        </label>
      </div>

      <div className="field-row">
        {showReadPage ? (
          <label className="field">
            <span>Halaman Terbaca</span>
            <input
              name="readPage"
              type="number"
              value={form.readPage}
              onChange={onChange}
              min="0"
            />
          </label>
        ) : null}

        <label className="field checkbox-field">
          <span>Status</span>
          <label className="checkbox-pill">
            <input
              name="reading"
              type="checkbox"
              checked={form.reading}
              onChange={onChange}
            />
            <span>Sedang dibaca</span>
          </label>
        </label>
      </div>

      <label className="field">
        <span>Ringkasan</span>
        <textarea
          name="summary"
          value={form.summary}
          onChange={onChange}
          placeholder="Tulis ringkasan atau catatan buku di sini..."
          rows="4"
        />
      </label>
    </>
  );
}

export default BookFields;
