import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BookForm from '../components/BookForm';
import { createEditForm, normalizeBookForm } from '../utils/bookshelfForms';
import { getBookById, updateBook } from '../api/books';

function EditBookPage() {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const res = await getBookById(id);
      if (res.status === 'success') {
        setForm(createEditForm(res.data.book));
        return;
      }
      navigate('/');
    };

    void load();
  }, [id, navigate]);

  if (!form) return null;

  const handleChange = (evt) => {
    const { name, type, checked, value } = evt.target;
    setForm((cur) => ({ ...cur, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = normalizeBookForm(form);
    const res = await updateBook(id, payload);
    if (res.status === 'success') {
      navigate(`/books/${id}`);
      return;
    }

    alert(res.message || 'Gagal memperbarui buku.');
  };

  const handleReset = () => {};

  return (
    <main className="page-root">
      <section className="panel form-panel">
        <div className="panel-head">
          <span className="panel-kicker">Edit Buku</span>
          <h2>Edit: {form.name}</h2>
        </div>

        <BookForm form={form} onChange={handleChange} onSubmit={handleSubmit} submitLabel="Simpan Perubahan" onReset={handleReset} />
      </section>
    </main>
  );
}

export default EditBookPage;
