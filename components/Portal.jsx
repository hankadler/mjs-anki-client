import { useState } from "react";
import css from "../styles/Portal.module.css";
import Banner from "./Banner";
import PortalTabs from "./PortalTabs";
import PortalForm from "./PortalForm";
import PortalSubmit from "./PortalSubmit";

export default function Portal() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [passwordAgainDisabled, setPasswordAgainDisabled] = useState(true);
  const passwordMinLength = 4;
  const [afterPasswordElement, setAfterPasswordElement] = useState(null);
  const [forgotPasswordDisabled, setForgotPasswordDisabled] = useState(true);

  return (
    <div className={css.Portal}>
      <Banner />
      <div className={css.Main}>
        <PortalTabs activeTabIndex={activeTabIndex} setActiveTabIndex={setActiveTabIndex} />
        <PortalForm
          activeTabIndex={activeTabIndex}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          passwordAgain={passwordAgain}
          passwordAgainDisabled={passwordAgainDisabled}
          setPasswordAgainDisabled={setPasswordAgainDisabled}
          setPasswordAgain={setPasswordAgain}
          passwordMinLength={passwordMinLength}
          afterPasswordElement={afterPasswordElement}
          setAfterPasswordElement={setAfterPasswordElement}
          forgotPasswordDisabled={forgotPasswordDisabled}
          setForgotPasswordDisabled={setForgotPasswordDisabled}
        />
        <PortalSubmit
          activeTabIndex={activeTabIndex}
          email={email}
          password={password}
          passwordAgain={passwordAgain}
          passwordMinLength={passwordMinLength}
        />
      </div>
    </div>
  );
}
