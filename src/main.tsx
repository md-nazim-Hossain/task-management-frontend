import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style/index.css";
import App from "./App.tsx";
import { BrowserRouter as Router } from "react-router";
import { ThemeProvider } from "./components/providers/theme-providers.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { Toaster } from "@/components/ui/sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <ThemeProvider>
        <Provider store={store}>
          <App />
          <Toaster />
        </Provider>
      </ThemeProvider>
    </Router>
  </StrictMode>
);
