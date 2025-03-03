import { useState } from "react";
import { useAuth } from "../utils/Auth";
import axios from "axios";

const API_URL = "http://localhost:3001/graphql";

const LOGIN_MUTATION = `
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
      }
    }
  }
`;

const LoginForm = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("⚠️ Both fields are required.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        API_URL,
        {
          query: LOGIN_MUTATION,
          variables: { email, password },
        },
        { headers: { "Content-Type": "application/json" } }
      );

      const data = response.data;
      if (data.errors) {
        throw new Error(data.errors[0].message);
      }

      console.log("✅ Login Successful:", data);
      localStorage.setItem("token", data.data.login.token);
      login(data.data.login.token);
    } catch (err: any) {
      console.error("❌ Login error:", err);
      setError(err.message || "⚠️ Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition font-semibold"
            disabled={loading}
          >
            {loading ? "🔄 Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
