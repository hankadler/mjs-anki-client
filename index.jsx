import { createRoot } from "react-dom/client";
import AppContextProvider from "./contexts/AppContextProvider";
import App from "./App";

const container = document.getElementById("app");
const root = createRoot(container);
root.render(
  <AppContextProvider>
    <App />
  </AppContextProvider>
);
