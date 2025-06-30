import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "@/store/store";
import { loginSchema, registerSchema, validateForm } from "@/lib/validations";
import { authApi } from "@/lib/api";
import type { LoginCredentials, RegisterCredentials } from "@/lib/api";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
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
    setValidationErrors({});

    // Validate form data
    const formData: LoginCredentials = { email, password };
    const validation = validateForm(loginSchema, formData);
    
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      return;
    }

    try {
      const data = await authApi.login(formData);
      
      if (!data.user) {
        throw new Error(data.error || "Login failed");
      }
      
      setUser({ email: data.user.email });
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || err.response?.data?.error || "Login failed");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setValidationErrors({});

    // Validate form data
    const formData: RegisterCredentials = { username, email, password };
    const validation = validateForm(registerSchema, formData);
    
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      return;
    }

    try {
      const data = await authApi.register(formData);
      
      if (!data.user) {
        throw new Error(data.error || "Registration failed");
      }
      
      setUser({ email: data.user.email });
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || err.response?.data?.error || "Registration failed");
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
                className={`w-full px-4 py-2 border rounded-lg text-zinc-700 placeholder:text-black/30 focus:outline-none ${
                  validationErrors.username ? 'border-red-500' : 'border-[#9c6644]'
                }`}
                placeholder="yourname"
              />
              {validationErrors.username && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.username}</p>
              )}
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
              className={`w-full px-4 py-2 border rounded-lg text-zinc-700 placeholder:text-black/30 focus:outline-none ${
                validationErrors.email ? 'border-red-500' : 'border-[#9c6644]'
              }`}
              placeholder="you@example.com"
            />
            {validationErrors.email && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>
            )}
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
              className={`w-full px-4 py-2 border rounded-lg text-zinc-700 placeholder:text-black/30 focus:outline-none ${
                validationErrors.password ? 'border-red-500' : 'border-[#9c6644]'
              }`}
              placeholder="••••••••"
            />
            {validationErrors.password && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.password}</p>
            )}
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
