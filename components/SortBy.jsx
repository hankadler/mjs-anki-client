import PropTypes from "prop-types";
import * as css from "../styles/SortBy.module.css";

const propTypes = {
  query: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  setQuery: PropTypes.func.isRequired
};

export default function SortBy({ query, setQuery }) {
  const handleSortBy = async (event) => setQuery({ ...query, sort: event.target.value });

  return (
    <label className={css.SortBy} htmlFor="sortBy">
      Sort:
      <select name="sortBy" id="sortBy" onChange={handleSortBy}>
        <option value="title.ascending">A-Z</option>
        <option value="title.descending">Z-A</option>
      </select>
    </label>
  );
}

SortBy.propTypes = propTypes;
