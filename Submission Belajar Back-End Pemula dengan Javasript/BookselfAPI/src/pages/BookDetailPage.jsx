import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getBookById, deleteBook } from '../api/books';

function BookDetailPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const res = await getBookById(id);
      if (res.status === 'success') {
        setBook(res.data.book);
        return;
      }
      // not found or error
      navigate('/');
    };

    void load();
  }, [id, navigate]);

  const handleDelete = async () => {
    const ok = confirm('Hapus buku ini?');
    if (!ok) return;

    const res = await deleteBook(id);
    if (res.status === 'success') {
      navigate('/');
      return;
    }

    alert(res.message || 'Gagal menghapus buku.');
  };

  if (!book) return null;

  return (
    <main className="page-root">
      <section className="panel">
        <div className="panel-head">
          <span className="panel-kicker">Detail Buku</span>
          <h2>{book.name}</h2>
        </div>

        <p><strong>Penulis:</strong> {book.author || '-'}</p>
        <p><strong>Penerbit:</strong> {book.publisher || '-'}</p>
        <p><strong>Tahun:</strong> {book.year || '-'}</p>
        <p><strong>Halaman terbaca:</strong> {book.readPage ?? 0} / {book.pageCount ?? 0}</p>
        <p><strong>Ringkasan:</strong></p>
        <p>{book.summary || '-'}</p>

        <div className="form-actions">
          <Link to={`/books/${id}/edit`} className="btn btn-secondary">Edit</Link>
          <button type="button" className="btn btn-danger" onClick={handleDelete}>Hapus</button>
        </div>
      </section>
    </main>
  );
}

export default BookDetailPage;
