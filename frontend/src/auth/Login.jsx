import { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await API.post(`${process.env.VITE_BACKEND_URL}/auth/login`, { email, password });
      
      if (res.data.success) {
        const { token, user } = res.data;
        
        // Store all necessary data in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("role", user.role);
        localStorage.setItem("userId", user.id);
        localStorage.setItem("userName", user.name);
        localStorage.setItem("userEmail", user.email);
        
        toast.success(res.data.message || "Login successful!");
        
        // Redirect based on role
        if (user.role === "host") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-6">
          StayFinder
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Sign in to your account
        </p>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        
        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}