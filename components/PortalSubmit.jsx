import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import * as css from "../styles/PortalSubmit.module.css";
import useApp from "../hooks/useApp";
import { POST } from "../utils/api";

const propTypes = {
  activeTabIndex: PropTypes.oneOf([0, 1]).isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  passwordAgain: PropTypes.string.isRequired,
  passwordMinLength: PropTypes.number.isRequired
};

export default function PortalSubmit({
  activeTabIndex, email, password, passwordAgain, passwordMinLength
}) {
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const { setStatus, setEmail, setUserId, setError } = useApp();
  const navigate = useNavigate();

  // disable submit on invalid passwords
  useEffect(() => {
    if (activeTabIndex === 0) {
      setSubmitDisabled(password.length < passwordMinLength);
    } else {
      setSubmitDisabled(passwordAgain.length < passwordMinLength);
    }
    if (passwordAgain.length >= password.length && passwordAgain !== password) {
      setSubmitDisabled(true);
      setStatus("Passwords don't match!");
    }
  }, [password, passwordAgain]);

  const onSubmit = async () => {
    setSubmitDisabled(true);
    setStatus(activeTabIndex === 0 ? "Signing in..." : "Signing up...");
    const resource = activeTabIndex === 0 ? "signIn" : "signUp";
    const requestBody = { email, password };
    if (resource === "signUp") requestBody.passwordAgain = passwordAgain;
    const { error, responseBody } = await POST(resource, requestBody);
    if (error) {
      setStatus(error.message);
      setError(error);
      navigate("/error");
    } else if (responseBody.status === "fail") {
      setStatus(error.message);
      navigate("/error");
    } else if (resource === "signIn") {
      setStatus(responseBody.message);
      setUserId(responseBody.userId);
      navigate("/decks");
      setEmail(""); // to disable navigation to "/activation" which is no longer needed
    } else if (resource === "signUp") {
      setStatus(responseBody.message);
      setEmail(email);
      navigate("/activation");
    }
  };

  return (
    <div className={css.PortalSubmit}>
      <button id="portalSubmit" type="button" onClick={onSubmit} disabled={submitDisabled}>
        Submit
      </button>
    </div>
  );
}

PortalSubmit.propTypes = propTypes;
