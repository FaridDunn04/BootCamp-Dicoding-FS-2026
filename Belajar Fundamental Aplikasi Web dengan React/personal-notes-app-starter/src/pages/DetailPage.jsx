import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { showFormattedDate } from '../utils';
import DeleteButton from '../components/DeleteButton';
import ArchiveButton from '../components/ArchiveButton';
import NotFoundPage from './NotFoundPage';
import LoadingIndicator from '../components/LoadingIndicator';
import { archiveNote, deleteNote, getNote, unarchiveNote } from '../utils/network-data';
import { useLanguage } from '../contexts/LanguageContext';

function DetailPage() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { t, locale } = useLanguage();
	const [note, setNote] = React.useState(null);
	const [isLoading, setIsLoading] = React.useState(true);
	const [errorMessage, setErrorMessage] = React.useState('');

	const loadNote = React.useCallback(async () => {
		setIsLoading(true);

		const response = await getNote(id);

		if (response.error) {
			setNote(null);
			setErrorMessage(response.message || t('noteLoadError'));
		} else {
			setNote(response.data);
			setErrorMessage('');
		}

		setIsLoading(false);
	}, [id, t]);

	React.useEffect(() => {
		loadNote();
	}, [loadNote]);

	if (isLoading) {
		return <LoadingIndicator label={t('loadingNote')} />;
	}

	if (!note) {
		return <NotFoundPage />;
	}

	const handleDelete = async () => {
		const response = await deleteNote(id);

		if (response.error) {
			setErrorMessage(response.message || t('noteActionError'));
			return;
		}

		navigate('/');
	};

	const handleArchive = async () => {
		const response = await archiveNote(id);

		if (!response.error) {
			loadNote();
		}
	};

	const handleUnarchive = async () => {
		const response = await unarchiveNote(id);

		if (!response.error) {
			loadNote();
		}
	};

	return (
		<section className="detail-page">
			<Link className="detail-page__backlink" to="/">
				{t('backToList')}
			</Link>

			<p className="detail-page__createdAt">{showFormattedDate(note.createdAt, locale === 'en' ? 'en-US' : 'id-ID')}</p>
			<h2 className="detail-page__title">{note.title}</h2>

			<div className="detail-page__body">{note.body}</div>

			{errorMessage ? <p className="form-feedback form-feedback--error">{errorMessage}</p> : null}

			<div className="detail-page__action">
				<ArchiveButton
					archived={note.archived}
					onArchive={handleArchive}
					onUnarchive={handleUnarchive}
				/>
				<DeleteButton onDelete={handleDelete} />
			</div>
		</section>
	);
}

export default DetailPage;
