import React from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import * as Sentry from "@sentry/react";
import App from "./App.jsx";
import "./index.css";
import { initMonitoring } from "./monitoring/initMonitoring.js";

initMonitoring();

const AppWithProfiler = import.meta.env.PROD ? Sentry.withProfiler(App) : App;

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

const appTree = (
  <React.StrictMode>
    <HelmetProvider>
      <Sentry.ErrorBoundary fallback={<div className="text-center p-10 text-red-500">Something went wrong.</div>}>
        <AppWithProfiler />
      </Sentry.ErrorBoundary>
    </HelmetProvider>
  </React.StrictMode>
);

createRoot(rootElement).render(appTree);

if (import.meta.env.PROD && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .catch((err) => {
        if (import.meta.env.DEV) {
          console.warn("Service worker registration failed", err);
        }
      });
  });
}
