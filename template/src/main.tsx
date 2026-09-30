import "./index.css";

import { initTheme } from "@jacobragsdale/ui/lib/theme";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./app";

initTheme();

const root = document.querySelector("#root");
if (root === null) {
  throw new Error("index.html is missing #root");
}
createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);
