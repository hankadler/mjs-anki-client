import { useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import css from "../styles/PortalForm.module.css";
import PortalField from "./PortalField";

const propTypes = {
  activeTabIndex: PropTypes.oneOf([0, 1]).isRequired,
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  passwordAgain: PropTypes.string.isRequired,
  setPasswordAgain: PropTypes.func.isRequired,
  passwordAgainDisabled: PropTypes.bool.isRequired,
  setPasswordAgainDisabled: PropTypes.func.isRequired,
  passwordMinLength: PropTypes.number.isRequired,
  afterPasswordElement: PropTypes.element,
  setAfterPasswordElement: PropTypes.func.isRequired,
  forgotPasswordDisabled: PropTypes.bool.isRequired,
  setForgotPasswordDisabled: PropTypes.func.isRequired
};

const defaultProps = {
  afterPasswordElement: null
};

export default function PortalForm({
  activeTabIndex,
  email,
  setEmail,
  password,
  setPassword,
  passwordAgain,
  setPasswordAgain,
  passwordAgainDisabled,
  setPasswordAgainDisabled,
  passwordMinLength,
  afterPasswordElement,
  setAfterPasswordElement,
  forgotPasswordDisabled,
  setForgotPasswordDisabled
}) {
  const navigate = useNavigate();

  // disable password & forgotPassword until email is valid
  useEffect(() => setForgotPasswordDisabled(!validator.isEmail(email)), [email]);

  // disable passwordAgain until password meets passwordMinLength requirement
  useEffect(() => setPasswordAgainDisabled(password.length < passwordMinLength), [password]);

  // provide feedback if passwordAgain doesn't match password
  useEffect(() => {
    const element = document.getElementById("passwordAgain");
    if (element) {
      if (passwordAgain.length >= password.length && passwordAgain !== password) {
        element.style.backgroundColor = "#fcb";
      } else {
        element.style.backgroundColor = "";
      }
    }
  }, [passwordAgain]);

  // allow submit on pressing Enter from appropriate password field
  const onKeyPress = useCallback(async (event) => {
    if (event.key === "Enter") {
      if (activeTabIndex === 0 && password.length >= passwordMinLength) {
        document.getElementById("portalSubmit").click();
      }
      if (activeTabIndex === 1 && passwordAgain.length >= passwordMinLength) {
        document.getElementById("portalSubmit").click();
      }
    }
  }, [activeTabIndex, password, passwordAgain, passwordMinLength]);

  const resetPassword = async () => {
    navigate("/reset-password");
  };

  // set afterPasswordElement based on activeTabIndex
  useEffect(
    () => {
      const forgotPasswordElement = (
        <button
          className={css.link}
          type="button"
          disabled={forgotPasswordDisabled}
          onClick={resetPassword}
        >
          Forgot Password?
        </button>
      );
      const passwordAgainElement = (
        <PortalField
          text="Password Again"
          id="passwordAgain"
          type="password"
          minLength={passwordMinLength}
          state={passwordAgain}
          setState={setPasswordAgain}
          disabled={passwordAgainDisabled}
          onKeyPress={onKeyPress}
        />
      );
      setAfterPasswordElement(
        activeTabIndex === 0 ? forgotPasswordElement : passwordAgainElement
      );
    },
    [
      activeTabIndex,
      passwordAgain,
      setPasswordAgain,
      passwordAgainDisabled,
      passwordMinLength,
      setAfterPasswordElement,
      forgotPasswordDisabled,
      onKeyPress
    ]
  );

  return (
    <div className={css.PortalForm}>
      <PortalField
        text="Email"
        id="email"
        type="email"
        state={email}
        setState={setEmail}
        disabled={false}
      />
      <PortalField
        text="Password"
        id="password"
        type="password"
        minLength={passwordMinLength}
        state={password}
        setState={setPassword}
        disabled={false}
        onKeyPress={onKeyPress}
      />
      <div className={css.AfterPassword}>
        {afterPasswordElement}
      </div>
    </div>
  );
}

PortalForm.propTypes = propTypes;
PortalForm.defaultProps = defaultProps;
