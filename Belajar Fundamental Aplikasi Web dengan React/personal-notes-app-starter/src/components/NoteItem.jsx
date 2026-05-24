import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { showFormattedDate } from '../utils';
import { useLanguage } from '../contexts/LanguageContext';

function NoteItem({ id, title, body, createdAt, archived }) {
    const { locale } = useLanguage();

    return (
        <article className={`note-item${archived ? ' note-item--archived' : ''}`}>
            <Link className="note-item__link" to={`/notes/${id}`}>
                <h3 className="note-item__title">{title}</h3>
                <p className="note-item__createdAt">{showFormattedDate(createdAt, locale === 'en' ? 'en-US' : 'id-ID')}</p>
                <div className="note-item__body">{body}</div>
            </Link>
        </article>
    );
}

NoteItem.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    archived: PropTypes.bool.isRequired,
};

export default NoteItem;