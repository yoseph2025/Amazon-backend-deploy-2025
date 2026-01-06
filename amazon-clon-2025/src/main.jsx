// main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { DataProvider } from "./DataProvider/DataProvider.jsx";
import './App.css'

createRoot(document.getElementById("root")).render(

    <DataProvider>
      <App />
    </DataProvider>
);
