import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// react query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// Create a QueryClient instance
const queryClient = new QueryClient();

import App from "./App.jsx";
import "./index.scss";
import "./styles/_global.scss";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
