import React from "react";
import Sidebar from "./Sidebar";
import { Toaster } from "react-hot-toast";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <Sidebar />
      {/* Changed ml-64 to ml-72 to match new sidebar width */}
      <main className="flex-1 ml-72 p-8 transition-all duration-300">
        <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
          {children}
        </div>
      </main>
      <Toaster position="top-right" toastOptions={{
        className: 'text-sm font-medium',
        duration: 3000,
        style: { borderRadius: '8px', background: '#333', color: '#fff' }
      }}/>
    </div>
  );
}