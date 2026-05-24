import React from 'react';
import PropTypes from 'prop-types';

function LoadingIndicator({ label }) {
  return (
    <div className="loading-state" role="status" aria-live="polite" aria-busy="true">
      <span className="loading-state__spinner" aria-hidden="true" />
      <p>{label}</p>
    </div>
  );
}

LoadingIndicator.propTypes = {
  label: PropTypes.string.isRequired,
};

export default LoadingIndicator;