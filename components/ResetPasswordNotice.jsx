import PropTypes from "prop-types";
import * as css from "../styles/ResetPasswordNotice.module.css";
import keyImage from "../assets/key.png";

const propTypes = {
  email: PropTypes.string.isRequired
};

export default function ResetPasswordNotice({ email }) {
  return (
    <div className={css.ResetPasswordNotice}>
      <img src={keyImage} alt="green-key" width="300" height="300" />
      <h1>Reset Password</h1>
      <p>An reset-password link has been sent to <span className={css.Email}>{email}</span>.</p>
    </div>
  );
}

ResetPasswordNotice.propTypes = propTypes;
