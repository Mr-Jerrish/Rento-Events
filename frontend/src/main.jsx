import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/context/ThemeContext.jsx";
import { Toaster } from "react-hot-toast";
import { GlobalProvider } from "./components/context/GlobalContext.jsx";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <GlobalProvider>
      <ThemeProvider>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              transition: "all 0.8s ease-in-out",
            },
          }}
        />
      </ThemeProvider>
    </GlobalProvider>
  </BrowserRouter>,
);
