import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { t } = useLanguage();
  const [name, onNameChange, , resetName] = useInput('');
  const [email, onEmailChange, , resetEmail] = useInput('');
  const [password, onPasswordChange, , resetPassword] = useInput('');
  const [confirmPassword, onConfirmPasswordChange, , resetConfirmPassword] = useInput('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setErrorMessage(t('requiredField'));
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage(t('passwordMismatch'));
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    const response = await register({ name: name.trim(), email: email.trim(), password });

    setIsSubmitting(false);

    if (response.error) {
      setErrorMessage(response.message || t('registerFailed'));
      return;
    }

    resetName();
    resetEmail();
    resetPassword();
    resetConfirmPassword();
    navigate('/login');
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <p className="page-kicker">{t('register')}</p>
        <h2 className="page-title">{t('registerTitle')}</h2>
        <p className="page-lead">{t('registerLead')}</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-form__field" htmlFor="name">
            <span>{t('name')}</span>
            <input id="name" type="text" value={name} onChange={onNameChange} placeholder="Your name" />
          </label>

          <label className="auth-form__field" htmlFor="email">
            <span>{t('email')}</span>
            <input id="email" type="email" value={email} onChange={onEmailChange} placeholder="name@example.com" />
          </label>

          <label className="auth-form__field" htmlFor="password">
            <span>{t('password')}</span>
            <input id="password" type="password" value={password} onChange={onPasswordChange} placeholder="••••••••" />
          </label>

          <label className="auth-form__field" htmlFor="confirmPassword">
            <span>{t('confirmPassword')}</span>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={onConfirmPasswordChange}
              placeholder="••••••••"
            />
          </label>

          {errorMessage ? <p className="form-feedback form-feedback--error">{errorMessage}</p> : null}

          <button type="submit" className="action action--submit" disabled={isSubmitting}>
            {isSubmitting ? t('loadingAction') : t('registerButton')}
          </button>
        </form>

        <p className="auth-page__switch">
          {t('haveAccount')} <Link to="/login">{t('toLogin')}</Link>
        </p>
      </div>
    </section>
  );
}

export default RegisterPage;