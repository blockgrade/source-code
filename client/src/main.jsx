import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GradeProvider } from "./context/grade.provider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GradeProvider>
      <App />
    </GradeProvider>
  </StrictMode>
);
