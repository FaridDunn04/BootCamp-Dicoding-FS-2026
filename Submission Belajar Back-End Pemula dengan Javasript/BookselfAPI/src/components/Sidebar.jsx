import BookFilters from './BookFilters';

function Sidebar({ filters, onFilterChange, onClear }) {
  return (
    <aside className="site-sidebar">
      <div className="sidebar-title">
        <h1>Rak Buku Digital</h1>
        <p className="muted">Rapi, santai, dan gampang dipakai.</p>
      </div>

      <div className="sidebar-search">
        <BookFilters filters={filters} onChange={onFilterChange} onClear={onClear} />
      </div>
    </aside>
  );
}

export default Sidebar;
