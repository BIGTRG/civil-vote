import { AuthStrategyRoutes } from "./auth/AuthStrategyRoutes";
import ErrorBoundary from "./components/ErrorBoundary";
import { InstallPrompt } from "./components/InstallPrompt";
import { Toaster } from "./components/ui/sonner";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="system" switchable>
        <Toaster />
        <AuthStrategyRoutes />
        <InstallPrompt />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
