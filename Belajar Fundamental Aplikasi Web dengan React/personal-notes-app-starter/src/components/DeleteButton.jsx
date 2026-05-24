import React from 'react';
import PropTypes from 'prop-types';

function DeleteButton({ onDelete }) {
    return (
        <button type="button" className="action action--danger" onClick={onDelete}>
            Hapus
        </button>
    );
}

DeleteButton.propTypes = {
    onDelete: PropTypes.func.isRequired,
};

export default DeleteButton;