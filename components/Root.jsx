import "animate.css";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import * as css from "../styles/Root.module.css";
import exitIcon from "../assets/exit.png";
import useApp from "../hooks/useApp";
import { DELETE } from "../utils/api";

export default function Root() {
  const [signOutDisabled, setSignOutDisabled] = useState(true);
  const { status, setStatus, setError, userId, setUserId } = useApp();
  const navigate = useNavigate();

  // disable Sign Out unless userId is set
  useEffect(() => {
    if (userId) {
      setSignOutDisabled(false);
    } else {
      setSignOutDisabled(true);
    }
  }, [userId]);

  // sign out
  const onSignOut = async () => {
    const { error, responseBody } = await DELETE("signOut");
    if (error) {
      setStatus(error.message);
      setError(error);
      navigate("/error");
    } else {
      setStatus(responseBody.message);
      setUserId("");
      navigate("/");
    }
  };

  return (
    <div className={css.Root}>
      <header className={css.Header}>
        <button type="button" data-tip="Sign Out" onClick={onSignOut} disabled={signOutDisabled}>
          <img src={exitIcon} alt="" width="24" height="24" />
        </button>
        <ReactTooltip place="left" type="dark" effect="solid" />
      </header>
      <main className={css.Main}>
        <Outlet />
      </main>
      <footer className={css.Footer}>
        <p className={status ? null : "animate__animated animate__fadeOut"}>
          <span className={css.StatusSpan}>Status:</span>
          {status}
        </p>
      </footer>
    </div>
  );
}
