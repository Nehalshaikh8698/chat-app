import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingPage";
import SignUpPage from "./pages/SignUpPage";

import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";

const App = () => {
  //////////////////////////////////////////////////////
  // Stores
  //////////////////////////////////////////////////////

  const {
    authUser,
    checkAuth,
    isCheckingAuth,
  } = useAuthStore();

  const { theme } = useThemeStore();

  //////////////////////////////////////////////////////
  // Check Authentication
  //////////////////////////////////////////////////////

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  //////////////////////////////////////////////////////
  // Loading Screen
  //////////////////////////////////////////////////////

  if (isCheckingAuth) {
    return (
      <div
        data-theme={theme}
        className="flex min-h-screen items-center justify-center bg-base-200"
      >
        <Loader2 className="size-10 animate-spin text-primary" />
      </div>
    );
  }

  //////////////////////////////////////////////////////
  // Routes
  //////////////////////////////////////////////////////

  return (
    <div data-theme={theme}>
      <Navbar />

      <Routes>

        {/* Home */}
        <Route
          path="/"
          element={
            authUser ? (
              <HomePage />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Login */}
        <Route
          path="/login"
          element={
            authUser ? (
              <Navigate to="/" replace />
            ) : (
              <LoginPage />
            )
          }
        />

        {/* Signup */}
        <Route
          path="/signup"
          element={
            authUser ? (
              <Navigate to="/" replace />
            ) : (
              <SignUpPage />
            )
          }
        />

        {/* Profile */}
        <Route
          path="/profile"
          element={
            authUser ? (
              <ProfilePage />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Settings */}
        <Route
          path="/settings"
          element={
            authUser ? (
              <SettingsPage />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Unknown Route */}
        <Route
          path="*"
          element={
            <Navigate
              to={authUser ? "/" : "/login"}
              replace
            />
          }
        />

      </Routes>

      {/* Toast */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
        }}
      />
    </div>
  );
};

export default App;