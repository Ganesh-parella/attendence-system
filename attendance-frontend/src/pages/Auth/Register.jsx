import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../store/useAuth";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { UserPlus, Briefcase, Mail, Lock, User } from "lucide-react";

// ✅ FIXED: Defined OUTSIDE the main component
const InputField = ({ icon: Icon, ...props }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
      <Icon size={18} />
    </div>
    <input 
      {...props} 
      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-400"
    />
  </div>
);

export default function Register() {
  const [formData, setFormData] = useState({
    name: "", email: "", password: "", department: "", role: "employee"
  });
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await register(formData);
      toast.success("Account created successfully!");
      navigate("/");
    } catch (err) {
      toast.error(typeof err === 'string' ? err : "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
      {/* Left: Form Section */}
      <div className="flex items-center justify-center p-8 sm:p-12 lg:p-16">
        <motion.div 
          initial={{opacity:0, y:20}} 
          animate={{opacity:1, y:0}} 
          className="w-full max-w-md space-y-8"
        >
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Create Account</h2>
            <p className="mt-2 text-sm text-gray-600">Join <span className="font-semibold text-blue-600">WorkPulse</span> today</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <InputField icon={User} name="name" placeholder="Full Name" required value={formData.name} onChange={handleChange} />
            <InputField icon={Mail} name="email" type="email" placeholder="Email Address" required value={formData.email} onChange={handleChange} />
            <InputField icon={Lock} name="password" type="password" placeholder="Password" required value={formData.password} onChange={handleChange} />
            
            <div className="grid grid-cols-2 gap-4">
                <InputField icon={Briefcase} name="department" placeholder="Department" required value={formData.department} onChange={handleChange} />
                <div className="relative">
                  <select 
                    name="role" 
                    value={formData.role}
                    className="w-full pl-3 pr-4 py-3 bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
                    onChange={handleChange}
                  >
                    <option value="employee">Employee</option>
                    <option value="manager">Manager</option>
                  </select>
                </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? "Creating..." : "Sign Up"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600">
            Already have an account? <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">Sign In</Link>
          </p>
        </motion.div>
      </div>

      {/* Right: Decorative Section */}
      <div className="hidden lg:block relative bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-900 opacity-90"></div>
        <img 
          src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
          alt="Office" 
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
        />
        <div className="relative h-full flex flex-col justify-end p-12 text-white">
          <h3 className="text-4xl font-bold mb-4">Streamlined Management</h3>
          <p className="text-lg text-blue-100 max-w-md">Join thousands of companies using WorkPulse to manage time efficiently.</p>
        </div>
      </div>
    </div>
  );
}