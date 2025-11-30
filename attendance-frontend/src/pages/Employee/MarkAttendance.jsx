import React, { useState, useEffect } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export default function MarkAttendance() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAction = async (type) => {
    const loadingToast = toast.loading(`${type === 'in' ? 'Checking In' : 'Checking Out'}...`);
    try {
      await api.post(`/attendance/${type === 'in' ? 'checkin' : 'checkout'}`);
      toast.success(`Successfully Checked ${type === 'in' ? 'In' : 'Out'}`, { id: loadingToast });
    } catch (err) {
      toast.error(err, { id: loadingToast });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-12 rounded-2xl shadow-xl border border-gray-100 text-center max-w-lg w-full"
      >
        <div className="mb-8">
          <h2 className="text-gray-500 text-lg uppercase tracking-wider font-medium">Current Time</h2>
          <div className="text-6xl font-bold text-dark-900 font-mono mt-2">
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </div>
          <p className="text-primary-600 mt-2 font-medium">{time.toDateString()}</p>
        </div>

        <div className="flex items-center justify-center gap-2 text-gray-400 mb-8 bg-gray-50 py-2 rounded-full mx-auto w-fit px-6">
          <MapPin size={16} />
          <span className="text-sm">Location Tracking Enabled</span>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleAction('in')}
            className="p-6 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30 flex flex-col items-center gap-2"
          >
            <span className="text-xl font-bold">Check In</span>
            <span className="text-green-100 text-sm">Start your day</span>
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleAction('out')}
            className="p-6 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/30 flex flex-col items-center gap-2"
          >
            <span className="text-xl font-bold">Check Out</span>
            <span className="text-red-100 text-sm">End your shift</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}