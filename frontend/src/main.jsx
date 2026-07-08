import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import "./index.css";

//////////////////////////////////////////////////////
// Root
//////////////////////////////////////////////////////

const root = createRoot(document.getElementById("root"));

//////////////////////////////////////////////////////
// Render
//////////////////////////////////////////////////////

root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);