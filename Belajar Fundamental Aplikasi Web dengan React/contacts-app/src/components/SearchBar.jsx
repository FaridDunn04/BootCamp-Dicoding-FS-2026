import React from "react";
import PropTypes from "prop-types";
import { LocalConsumer } from "../contexts/LocaleContext";

function SearchBar({keyword,keywordChange}){
    return (
        <LocalConsumer>
        {
            ({ locale }) => {
            return (
                <input
                className="search-bar"
                type="text"
                placeholder={locale === 'id' ? 'Cari berdasarkan nama' : 'Search by name'}
                value={keyword}
                onChange={(event) => keywordChange(event.target.value)} />
            )
            }
        }
        </LocalConsumer>
    )
}

SearchBar.propTypes={
    keyword: PropTypes.string.isRequired,
    keywordChange: PropTypes.func.isRequired
}

export default SearchBar;