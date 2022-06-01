import PropTypes from "prop-types";
import * as css from "../styles/SignUpNotice.module.css";
import shieldImage from "../assets/shield.png";

const propTypes = {
  email: PropTypes.string.isRequired
};

export default function SignUpNotice({ email }) {
  return (
    <div className={css.SignUpNotice}>
      <img src={shieldImage} alt="green-shield" width="300" height="300" />
      <h1>Account Activation</h1>
      <p>An activation link has been sent to <span className={css.Email}>{email}</span>.</p>
      <p>Please activate your account before signing in.</p>
    </div>
  );
}

SignUpNotice.propTypes = propTypes;
