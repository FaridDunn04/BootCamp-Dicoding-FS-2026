import React from 'react';
import PropTypes from 'prop-types';
import NoteItem from './NoteItem';

function NoteList({ notes, emptyMessage }) {
    if (notes.length === 0) {
        return (
            <div className="notes-list-empty">
                <p>{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div className="notes-list">
            {notes.map((note) => (
                <NoteItem key={note.id} {...note} />
            ))}
        </div>
    );
}

NoteList.propTypes = {
    notes: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            body: PropTypes.string.isRequired,
            createdAt: PropTypes.string.isRequired,
            archived: PropTypes.bool.isRequired,
        }),
    ).isRequired,
    emptyMessage: PropTypes.string.isRequired,
};

export default NoteList;