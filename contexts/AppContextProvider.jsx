import { createContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";

export const AppContext = createContext(null);

const propTypes = {
  children: PropTypes.node.isRequired
};

export default function AppContextProvider({ children }) {
  const [status, setStatus] = useState("");
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
  const [decks, setDecks] = useState([]);
  const [deckId, setDeckId] = useState("");

  const value = useMemo(() => ({
    status,
    setStatus,
    error,
    setError,
    email,
    setEmail,
    userId,
    setUserId,
    decks,
    setDecks,
    deckId,
    setDeckId,
  }), [status, error, email, userId, decks, deckId]);

  useEffect(() => {
    if (status) {
      setTimeout(() => setStatus(""), 5000);
    }
  }, [status]);

  // on change userId
  useEffect(() => {
    if (userId) {
      localStorage.setItem("userId", userId);
    } else {
      localStorage.removeItem("userId");
    }
  }, [userId]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

AppContextProvider.propTypes = propTypes;
