import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import css from "../styles/Error.module.css";
import backImg from "../assets/back.svg";

const propTypes = {
  message: PropTypes.string.isRequired,
  code: PropTypes.number
};

const defaultProps = {
  code: 400
};

export default function Error({ message, code }) {
  return (
    <div className={css.Error}>
      <h1 className={css.code}>{code}</h1>
      <p className={css.message}>
        {message}
        <br />
        <Link to="/">
          <img src={backImg} alt="back" width="100" />
        </Link>
      </p>
    </div>
  );
}

Error.propTypes = propTypes;
Error.defaultProps = defaultProps;
