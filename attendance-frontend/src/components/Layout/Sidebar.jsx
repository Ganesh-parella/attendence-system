import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../store/useAuth";
import { LayoutDashboard, CheckCircle, Clock, User, LogOut, BarChart3, Users } from "lucide-react";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const NavItem = ({ to, icon: Icon, label }) => {
    const active = isActive(to);
    return (
      <Link 
        to={to} 
        className={`
          group flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 font-medium
          ${active 
            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 translate-x-1' 
            : 'text-slate-400 hover:bg-white/10 hover:text-white hover:translate-x-1'
          }
        `}
      >
        <Icon size={20} className={`transition-colors ${active ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
        <span>{label}</span>
      </Link>
    );
  };

  return (
    <div className="w-72 bg-slate-900 h-screen fixed left-0 top-0 flex flex-col text-white border-r border-slate-800 shadow-2xl z-40">
      {/* Header */}
      <div className="p-8 pb-4">
        <div className="flex items-center gap-3 mb-6">
          {/* Updated Logo to 'W' */}
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white shadow-blue-500/20 shadow-lg">
            W
          </div>
          {/* Updated Name */}
          <h1 className="text-xl font-bold tracking-tight text-white">WorkPulse</h1>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-3 flex items-center gap-3 border border-slate-700/50">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
            {user?.name?.charAt(0)}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-medium text-white truncate">{user?.name}</p>
            <p className="text-xs text-slate-400 truncate capitalize">{user?.role}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto py-4 scrollbar-hide">
        <div className="px-4 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Menu</div>
        
        {user?.role === 'employee' && (
          <>
            <NavItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
            <NavItem to="/mark" icon={CheckCircle} label="Mark Attendance" />
            <NavItem to="/history" icon={Clock} label="My History" />
          </>
        )}
        
        {user?.role === 'manager' && (
          <>
            <NavItem to="/manager" icon={LayoutDashboard} label="Overview" />
            <NavItem to="/manager/all" icon={Users} label="Employees" />
            <NavItem to="/manager/reports" icon={BarChart3} label="Reports" />
          </>
        )}
        
        <div className="px-4 mt-8 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Settings</div>
        <NavItem to="/profile" icon={User} label="Profile" />
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/50">
        <button 
          onClick={logout} 
          className="flex items-center gap-3 px-4 py-3 w-full text-left text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl transition-all duration-200 group"
        >
          <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
}