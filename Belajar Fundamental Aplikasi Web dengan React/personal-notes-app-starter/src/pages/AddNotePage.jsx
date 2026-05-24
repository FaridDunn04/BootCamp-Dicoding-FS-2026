import React from 'react';
import { useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import { addNote } from '../utils/network-data';
import { useLanguage } from '../contexts/LanguageContext';

function AddNotePage() {
	const navigate = useNavigate();
	const { t } = useLanguage();
	const [title, onTitleChange, , resetTitle] = useInput('');
	const [body, onBodyChange, , resetBody] = useInput('');
	const [errorMessage, setErrorMessage] = React.useState('');
	const [isSubmitting, setIsSubmitting] = React.useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!title.trim() || !body.trim()) {
			setErrorMessage(t('fillNoteFields'));
			return;
		}

		setIsSubmitting(true);
		setErrorMessage('');

		const response = await addNote({ title: title.trim(), body: body.trim() });

		setIsSubmitting(false);

		if (response.error) {
			setErrorMessage(response.message || t('noteActionError'));
			return;
		}

		resetTitle();
		resetBody();
		navigate('/');
	};

	return (
		<section className="page-content add-new-page">
			<div className="page-heading">
				<div>
					<p className="page-kicker">{t('createNote')}</p>
					<h2 className="page-title">{t('createNoteTitle')}</h2>
				</div>
				<p className="page-lead">{t('createNoteLead')}</p>
			</div>

			<form onSubmit={handleSubmit}>
				<div className="add-new-page__input">
					<label className="sr-only" htmlFor="title">{t('noteFieldTitle')}</label>
					<input
						id="title"
						className="add-new-page__input__title"
						type="text"
						placeholder={t('noteTitlePlaceholder')}
						value={title}
						onChange={onTitleChange}
					/>

					<label className="sr-only" htmlFor="body">{t('noteFieldBody')}</label>
					<textarea
						id="body"
						className="add-new-page__input__body"
						placeholder={t('noteBodyPlaceholder')}
						value={body}
						onChange={onBodyChange}
					/>
				</div>

				{errorMessage ? <p className="form-feedback form-feedback--error">{errorMessage}</p> : null}

				<div className="add-new-page__action">
					<button type="submit" className="action action--submit" disabled={isSubmitting}>
						{isSubmitting ? t('loadingAction') : t('saveNote')}
					</button>
				</div>
			</form>
		</section>
	);
}

export default AddNotePage;
