import { AppProviders } from "./provider";
import { QueryClient, QueryClientProvider } from "react-query";
import AppRouter from "./router";
import React from "react";

const queryClient = new QueryClient();


const App: React.FC  = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <AppProviders>
                <AppRouter />
            </AppProviders>
        </QueryClientProvider>
    )
}

export default App; 