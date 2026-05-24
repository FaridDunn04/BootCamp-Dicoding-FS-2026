import BookFields from './BookFields';

function BookForm({ form, onChange, onSubmit, submitLabel, onReset, showReadPage = true }) {
  return (
    <section className="panel form-panel">
      <div className="panel-head">
        <span className="panel-kicker">Form Buku</span>
        <h2>{submitLabel}</h2>
      </div>

      <form className="form-grid" onSubmit={onSubmit} onReset={onReset}>
        <BookFields form={form} onChange={onChange} showReadPage={showReadPage} />

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {submitLabel}
          </button>
          <button type="reset" className="btn btn-secondary">
            Reset
          </button>
        </div>
      </form>
    </section>
  );
}

export default BookForm;
