import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useLanguage();
  const [email, onEmailChange, , resetEmail] = useInput('');
  const [password, onPasswordChange, , resetPassword] = useInput('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setErrorMessage(t('requiredField'));
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    const response = await login({ email: email.trim(), password });

    setIsSubmitting(false);

    if (response.error) {
      setErrorMessage(response.message || t('loginFailed'));
      return;
    }

    resetEmail();
    resetPassword();
    navigate('/');
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <p className="page-kicker">{t('login')}</p>
        <h2 className="page-title">{t('loginTitle')}</h2>
        <p className="page-lead">{t('loginLead')}</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-form__field" htmlFor="email">
            <span>{t('email')}</span>
            <input id="email" type="email" value={email} onChange={onEmailChange} placeholder="name@example.com" />
          </label>

          <label className="auth-form__field" htmlFor="password">
            <span>{t('password')}</span>
            <input id="password" type="password" value={password} onChange={onPasswordChange} placeholder="••••••••" />
          </label>

          {errorMessage ? <p className="form-feedback form-feedback--error">{errorMessage}</p> : null}

          <button type="submit" className="action action--submit" disabled={isSubmitting}>
            {isSubmitting ? t('loadingAction') : t('loginButton')}
          </button>
        </form>

        <p className="auth-page__switch">
          {t('needAccount')} <Link to="/register">{t('toRegister')}</Link>
        </p>
      </div>
    </section>
  );
}

export default LoginPage;