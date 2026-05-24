import { useNavigate } from 'react-router-dom';
import BookList from '../components/BookList';
import BookStats from '../components/BookStats';
import NoticeBanner from '../components/NoticeBanner';
import Sidebar from '../components/Sidebar';
import useBookshelf from '../hooks/useBookshelf';

function BookshelfPage() {
  const navigate = useNavigate();

  const {
    books,
    clearFilters,
    filters,
    finishedBooks,
    notice,
    readingBooks,
    removeBook,
    updateFilterField,
  } = useBookshelf();

  return (
    <main className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <NoticeBanner type={notice.type} message={notice.message} />

      <section className="layout-with-sidebar">
        <Sidebar filters={filters} onFilterChange={updateFilterField} onClear={clearFilters} />

        <main className="main-content">
          <div className="content-head">
            <BookStats totalBooks={books.length} finishedBooks={finishedBooks} readingBooks={readingBooks} />
          </div>

          <section className="panel">
            <div className="panel-head compact">
              <span className="panel-kicker">Daftar Buku</span>
              <h2>Koleksi yang sedang kamu simpan</h2>
            </div>

            <BookList books={books} onView={(b) => navigate(`/books/${b.id}`)} onDelete={removeBook} />
          </section>
        </main>
      </section>
    </main>
  );
}

export default BookshelfPage;
