import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./utils/Auth";
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import ErrorPage from "./pages/ErrorPage";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/" replace />;
}

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Navbar />
      <Routes>
        {/* Login Route */}
        <Route
          path="/"
          element={
            !isAuthenticated ? <LoginForm /> : <Navigate to="/home" replace />
          }
        />

        {/* Protected Home Route (Without Home.tsx) */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <h1 className="text-center text-2xl font-bold">
                Welcome to the Home Page! 🎉
              </h1>
            </ProtectedRoute>
          }
        />

        {/* Error Page */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
