import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalProvider.js";

import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router basename="/">
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </Router>
  </StrictMode>
);
