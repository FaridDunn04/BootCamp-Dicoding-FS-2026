import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookForm from '../components/BookForm';
import { initialBookForm, normalizeBookForm } from '../utils/bookshelfForms';
import { createBook } from '../api/books';

function AddBookPage() {
  const [form, setForm] = useState(initialBookForm);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, type, checked, value } = event.target;
    setForm((cur) => ({ ...cur, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleReset = () => setForm(initialBookForm);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = normalizeBookForm(form);
    const result = await createBook(payload);

    if (result.status === 'success') {
      navigate('/');
      return;
    }

    // naive alert on error
    // keep it simple for this exercise
    // user already has notice system in Bookshelf page
    alert(result.message || 'Gagal menambahkan buku.');
  };

  return (
    <main className="page-root">
      <section className="panel form-panel">
        <div className="panel-head">
          <span className="panel-kicker">Tambah Buku</span>
          <h2>Tambah buku baru</h2>
        </div>

        <BookForm form={form} onChange={handleChange} onSubmit={handleSubmit} submitLabel="Tambah Buku" onReset={handleReset} showReadPage={false} />
      </section>
    </main>
  );
}

export default AddBookPage;
