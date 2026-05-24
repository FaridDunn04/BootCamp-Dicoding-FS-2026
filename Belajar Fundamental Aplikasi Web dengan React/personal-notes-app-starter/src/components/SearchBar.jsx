import PropTypes from 'prop-types';

function SearchBar({ keyword, onKeywordChange, placeholder }) {
    return (
        <div className="search-bar">
            <input
                type="search"
                placeholder={placeholder}
                value={keyword}
                onChange={(event) => onKeywordChange(event.target.value)}
            />
        </div>
    );
}

SearchBar.propTypes = {
    keyword: PropTypes.string.isRequired,
    onKeywordChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
};

export default SearchBar;