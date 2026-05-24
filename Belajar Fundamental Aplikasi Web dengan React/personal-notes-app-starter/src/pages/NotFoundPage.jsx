import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

function NotFoundPage() {
	const { authedUser } = useAuth();
	const { t } = useLanguage();

	return (
		<section className="not-found-page">
			<p className="page-kicker">{t('notFoundTitle')}</p>
			<h2 className="page-title">404</h2>
			<p className="page-lead">{t('notFoundLead')}</p>
			<Link className="not-found-page__link" to={authedUser ? '/' : '/login'}>
				{authedUser ? t('returnHome') : t('returnLogin')}
			</Link>
		</section>
	);
}

export default NotFoundPage;
