import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { registerThemeToolsElements } from "./theme-tools";

registerThemeToolsElements();

createRoot(document.getElementById("root")!).render(<StrictMode><App /></StrictMode>);
