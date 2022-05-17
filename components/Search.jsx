import { useState } from "react";
import PropTypes from "prop-types";
import css from "../styles/Search.module.css";
import searchIcon from "../assets/search.png";
import clearIcon from "../assets/clear.png";

const propTypes = {
  query: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  setQuery: PropTypes.func.isRequired
};

export default function Search({ query, setQuery }) {
  const [searchString, setSearchString] = useState("");
  const [filter, setFilter] = useState("title");
  const [disabled, setDisabled] = useState(true);

  const onChangeFilter = async (event) => setFilter(event.target.value);

  const onEditSearch = async (event) => {
    const { value } = event.target;
    setSearchString(value);
    setDisabled(value === "");
    if (!value) setQuery({ limit: query.limit, skip: query.skip, sort: query.sort });
  };

  const onSearch = () => {
    const newQuery = { ...query };
    newQuery[filter] = searchString;
    setQuery(newQuery);
    setDisabled(true);
  };

  const onClear = () => {
    setQuery({ limit: query.limit, skip: query.skip, sort: query.sort });
    setSearchString("");
  };

  const onEnter = (event) => {
    if (event.key === "Enter") {
      if (disabled && searchString) {
        onClear();
      } else if (searchString) {
        onSearch();
      }
    }
  };

  return (
    <label className={css.Search} htmlFor="searchBar">
      <select name="filter" id="filter" value={filter} onChange={onChangeFilter}>
        <option value="title">Title</option>
        <option value="question">Question</option>
        <option value="answer">Answer</option>
      </select>
      <input
        id="searchBar"
        type="search"
        value={searchString}
        onChange={onEditSearch}
        onKeyPress={onEnter}
      />
      {disabled && searchString
        ? (
          <button type="button" onClick={onClear}>
            <img src={clearIcon} alt="" width="16" height="16" />
          </button>
        )
        : (
          <button type="button" disabled={disabled} onClick={onSearch}>
            <img src={searchIcon} alt="" width="16" height="16" />
          </button>
        )}
    </label>
  );
}

Search.propTypes = propTypes;
