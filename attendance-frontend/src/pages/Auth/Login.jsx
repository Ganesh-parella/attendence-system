import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../store/useAuth";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success("Welcome back!");
      navigate("/");
    } catch (err) {
      toast.error(typeof err === 'string' ? err : "Login failed");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="flex items-center justify-center p-8 bg-white">
        <motion.div initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} className="w-full max-w-md space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Sign in to your account</h2>
            <p className="mt-2 text-gray-500">Welcome back to <span className="font-semibold text-blue-600">WorkPulse</span></p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input type="email" required className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Password</label>
                <input type="password" required className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={password} onChange={e => setPassword(e.target.value)} />
              </div>
            </div>
            <button type="submit" className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-lg shadow-blue-500/30">Sign In</button>
            <p className="text-center text-sm text-gray-600">
              Don't have an account? <Link to="/register" className="text-blue-600 font-medium hover:underline">Register</Link>
            </p>
          </form>
        </motion.div>
      </div>
      <div className="hidden lg:flex flex-col justify-center items-center bg-slate-900 text-white p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-slate-900 opacity-90"></div>
        <div className="relative z-10 max-w-lg text-center">
          <h1 className="text-5xl font-bold mb-6">Manage Attendance with Ease</h1>
          <p className="text-gray-300 text-lg">Streamline your workforce with WorkPulse.</p>
        </div>
      </div>
    </div>
  );
}