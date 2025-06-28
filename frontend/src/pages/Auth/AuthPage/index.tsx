import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useAuthStore } from "@/store/store";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser, user } = useAuthStore();

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      const userData = res.data.user;
      setUser({ email: userData.email });

      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/register",
        { username, email, password },
        { withCredentials: true }
      );
      const userData = res.data.user;
      setUser({ email: userData.email });

      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#ede0d4] to-[#e6ccb2]">
      <div className="w-full max-w-md bg-gray-100 rounded-2xl p-8 shadow-xl space-y-6">
        <h2 className="text-3xl font-bold text-center text-[#9c6644] tracking-tight">
          {isLogin ? "Welcome Back" : "Create an Account"}
        </h2>
        <p className="text-center text-sm text-[#7f5539] mb-4">
          {isLogin
            ? "Sign in to manage your link page"
            : "Sign up to manage your link page"}
        </p>

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

        <form
          onSubmit={isLogin ? handleLogin : handleRegister}
          className="space-y-4"
        >
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-[#7f5539] mb-1">
                Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg text-zinc-700 border-[#9c6644] placeholder:text-black/30 focus:outline-none"
                placeholder="yourname"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-[#7f5539] mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-zinc-700 border-[#9c6644] placeholder:text-black/30 focus:outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#7f5539] mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-zinc-700 border-[#9c6644] placeholder:text-black/30 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#7f5539]/80 text-white cursor-pointer hover:bg-[#7f5539f4] py-2.5 rounded-lg font-medium hover:bg-brown-700 transition"
          >
            {isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <div className="text-sm text-center text-gray-600">
          {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-brown-600 font-medium hover:underline"
          >
            {isLogin ? "Create one" : "Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
