import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import useApp from "./hooks/useApp";
import Root from "./components/Root";
import Portal from "./components/Portal";
import Decks from "./components/Decks";
import Error from "./components/Error";
import Start from "./components/Start";
import SignUpNotice from "./components/SignUpNotice";
import ResetPasswordNotice from "./components/ResetPasswordNotice";

export default function App() {
  const { email, userId, deckId, error } = useApp();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index path="/" element={<Portal />} />
          {email
            ? <Route index path="/activation" element={<SignUpNotice email={email} />} />
            : null}
          {email
            ? <Route index path="/reset-password" element={<ResetPasswordNotice email={email} />} />
            : null}
          {userId
            ? <Route path="/decks" element={<Decks userId={userId} />} />
            : null}
          {deckId
            ? <Route path="/start" element={<Start deckId={deckId} />} />
            : null}
          {error
            ? <Route path="/error" element={<Error message={error.message} code={error.code} />} />
            : null}
          <Route path="*" element={<Navigate to={-1} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
