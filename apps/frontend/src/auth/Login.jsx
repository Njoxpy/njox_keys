import React, { useState, useEffect } from "react";
import { User, Lock, LogIn } from "lucide-react";
import API from "../utils/api"; // Your Axios instance
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore"; // Zustand store

const LoginPage = () => {
  const { token, login } = useAuthStore(); // Zustand auth state and actions
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (token) {
      navigate("/venues");
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await API.post("/v1/users/login", {
        email,
        password,
      });
      // assuming your API instance already has baseURL set from env

      const { token: authToken, userEmail, role } = response.data;

      // Save to localStorage
      localStorage.setItem("token", authToken);
      localStorage.setItem("userEmail", userEmail);

      // Sync Zustand store (login method expects user info + token)
      login({ email: userEmail, role }, authToken);

      navigate("/venues");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center bg-white p-4 rounded-lg shadow-sm">
            <LogIn className="h-8 w-8 text-blue-600 mr-2" />
            <span className="text-2xl font-bold text-slate-800">
              Welcome To KMS
            </span>
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold text-slate-800 text-center mb-6">
            Login
          </h1>

          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="block w-full pl-10 pr-3 py-3 bg-slate-100 text-slate-800 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="block w-full pl-10 pr-3 py-3 bg-slate-100 text-slate-800 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-3 px-4 bg-blue-600 text-white hover:bg-blue-700 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {loading ? (
                  "Logging in..."
                ) : (
                  <>
                    <LogIn className="h-5 w-5 mr-2" /> Login
                  </>
                )}
              </button>
            </div>

            <div className="text-center mt-4">
              <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                Forgot your password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
