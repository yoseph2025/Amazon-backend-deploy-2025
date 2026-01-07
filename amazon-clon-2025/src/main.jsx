// main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { DataProvider } from "./DataProvider/DataProvider.jsx";
import "./App.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename="/Amazon-backend-deploy-2025">
      <DataProvider>
        <App />
      </DataProvider>
    </BrowserRouter>
  </StrictMode>
);
