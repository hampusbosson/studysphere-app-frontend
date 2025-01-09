import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppRoutes from "./Routes/AppRoutes";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./context/AuthContext";

const queryClient = new QueryClient();
const rootElement = document.getElementById("root");

const root = ReactDOM.createRoot(rootElement as HTMLElement);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
