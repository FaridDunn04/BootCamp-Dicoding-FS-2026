import React from 'react';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import AddNotePage from './pages/AddNotePage';
import ArchivePage from './pages/ArchivePage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ThemeToggle from './components/ThemeToggle';
import LanguageToggle from './components/LanguageToggle';
import LoadingIndicator from './components/LoadingIndicator';
import { useAuth } from './contexts/AuthContext';
import { useLanguage } from './contexts/LanguageContext';

function App() {
  const { authedUser, isAuthReady, logout } = useAuth();
  const { t } = useLanguage();
  const location = useLocation();
  const showFloatingAdd = Boolean(authedUser) && location.pathname !== '/notes/new';
  const displayName = authedUser?.name || authedUser?.email;

  function LogoutIcon() {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path
          d="M13 6.5h2.8a1.7 1.7 0 0 1 1.7 1.7v7.6a1.7 1.7 0 0 1-1.7 1.7H13M9.5 8.5 6 12l3.5 3.5M16.5 12H6"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
      </svg>
    );
  }

  function ProtectedRoute({ children }) {
    if (!authedUser) {
      return <Navigate to="/login" replace />;
    }

    return children;
  }

  function PublicRoute({ children }) {
    if (authedUser) {
      return <Navigate to="/" replace />;
    }

    return children;
  }

  if (!isAuthReady) {
    return <LoadingIndicator label={t('loadingApp')} />;
  }

  return (
    <div className="app-container">
      <header className="site-header">
        <div className="site-header__brand">
          <p className="site-header__eyebrow">{t('appSubtitle')}</p>
          <h1 className="site-header__title">
            <Link to="/">{t('appName')}</Link>
          </h1>
          {authedUser ? (
            <div className="site-user-badge" title={authedUser.email} aria-label={`${t('userAccount')}: ${displayName}`}>
              <p className="site-user-badge__label">{t('userAccount')}</p>
              <p className="site-user-badge__name">{displayName}</p>
            </div>
          ) : null}
        </div>

        <nav className="site-nav" aria-label="Navigasi utama">
          <LanguageToggle />
          <ThemeToggle />
          {authedUser ? (
            <>
              <Link to="/">{t('notes')}</Link>
              <Link to="/archives">{t('archives')}</Link>
              <button
                type="button"
                className="site-action site-action--account"
                onClick={logout}
                aria-label={t('logout')}
                title={t('logout')}
              >
                <span className="site-action__icon" aria-hidden="true">
                  <LogoutIcon />
                </span>
                <span className="site-action__label">{t('logout')}</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login">{t('login')}</Link>
              <Link to="/register">{t('register')}</Link>
            </>
          )}
        </nav>
      </header>

      <main className="page-shell">
        <Routes>
          <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/archives" element={<ProtectedRoute><ArchivePage /></ProtectedRoute>} />
          <Route path="/notes/new" element={<ProtectedRoute><AddNotePage /></ProtectedRoute>} />
          <Route
            path="/notes/:id"
            element={
              <ProtectedRoute>
                <DetailPage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {showFloatingAdd ? (
        <Link className="floating-add-note" to="/notes/new" aria-label={t('addNote')} title={t('addNote')}>
          <span aria-hidden="true">+</span>
        </Link>
      ) : null}
    </div>
  );
}

export default App;
