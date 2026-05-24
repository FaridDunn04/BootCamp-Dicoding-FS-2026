import BookFields from './BookFields';

function BookModal({ title, form, onChange, onSubmit, onClose, showReadPage = true }) {
  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <section className="modal-card" role="dialog" aria-modal="true" aria-label={title} onClick={(event) => event.stopPropagation()}>
        <div className="panel-head compact modal-head">
          <div>
            <span className="panel-kicker">Edit Buku</span>
            <h2>{title}</h2>
          </div>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Tutup modal">
            ×
          </button>
        </div>

        <form className="form-grid" onSubmit={onSubmit}>
          <BookFields form={form} onChange={onChange} showReadPage={showReadPage} />

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">Simpan Perubahan</button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Batal</button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default BookModal;
