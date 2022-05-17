import { useState } from "react";
import PropTypes from "prop-types";
import css from "../styles/PortalTabs.module.css";

const propTypes = {
  activeTabIndex: PropTypes.oneOf([0, 1]).isRequired,
  setActiveTabIndex: PropTypes.func.isRequired
};

export default function PortalTabs({ activeTabIndex, setActiveTabIndex }) {
  const [tabStates, setTabStates] = useState([activeTabIndex === 0, activeTabIndex === 1]);

  const onClickTab = async (event) => {
    const tabIndex = parseInt(event.target.value, 10);
    setActiveTabIndex(tabIndex);
    setTabStates(tabStates.map((tabState, index) => tabIndex === index));
  };

  return (
    <div className={css.PortalTabs}>
      <button
        className={`${css.Tab} ${css.leftTab}`}
        type="button"
        onClick={onClickTab}
        value="0"
        disabled={tabStates[0]}
      >
        Sign In
      </button>
      <button
        className={`${css.Tab} ${css.rightTab}`}
        type="button"
        onClick={onClickTab}
        value="1"
        disabled={tabStates[1]}
      >
        Sign Up
      </button>
    </div>
  );
}

PortalTabs.propTypes = propTypes;
