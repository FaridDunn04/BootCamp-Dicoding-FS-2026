import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="site-nav">
      <div className="nav-inner">
        <Link to="/" className="brand">Bookshelf</Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/add">Tambah</Link>
          <Link to="/about">About</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
