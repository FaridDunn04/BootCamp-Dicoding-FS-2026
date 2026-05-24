import React from 'react';
import PropTypes from 'prop-types';

function ArchiveButton({ archived, onArchive, onUnarchive }) {
    const handleClick = archived ? onUnarchive : onArchive;
    const label = archived ? 'Batal Arsip' : 'Arsipkan';

    return (
        <button type="button" className="action action--archive" onClick={handleClick}>
            {label}
        </button>
    );
}

ArchiveButton.propTypes = {
    archived: PropTypes.bool.isRequired,
    onArchive: PropTypes.func.isRequired,
    onUnarchive: PropTypes.func.isRequired,
};

export default ArchiveButton;