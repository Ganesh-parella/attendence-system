import React, { useEffect, useState } from "react";
import api from "../../services/api";
import StatsCard from "../../components/StatsCard";
import { Users, UserCheck, UserX, Clock } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function ManagerDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/dashboard/manager").then(res => setData(res.data)).catch(console.error);
  }, []);

  if (!data) return <div className="p-8">Loading stats...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Manager Overview</h1>
        <p className="text-gray-500">Real-time insights across your organization</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard title="Total Employees" value={data.totalEmployees} icon={Users} color="blue" />
        <StatsCard title="Present Today" value={data.today.present} icon={UserCheck} color="green" />
        <StatsCard title="Absent Today" value={data.today.absent} icon={UserX} color="red" />
        <StatsCard title="Late Arrivals" value={data.today.late} icon={Clock} color="yellow" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trend Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-6">Attendance Trend (Last 7 Days)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.trend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="date" tickFormatter={(str) => str.slice(5)} stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Line type="monotone" dataKey="present" stroke="#2563eb" strokeWidth={3} dot={{r: 4, fill: '#2563eb', strokeWidth: 2, stroke:'#fff'}} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions / Info */}
        <div className="bg-gradient-to-br from-dark-900 to-dark-800 p-6 rounded-xl text-white shadow-lg">
          <h3 className="font-semibold text-lg mb-4">Quick Actions</h3>
          <p className="text-gray-400 text-sm mb-6">Manage your workforce efficiently.</p>
          
          <div className="space-y-3">
             <a href="/manager/all" className="block w-full py-3 px-4 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors text-center">
               View All Attendance
             </a>
             <a href="/manager/reports" className="block w-full py-3 px-4 bg-primary-600 hover:bg-primary-500 rounded-lg text-sm font-medium transition-colors text-center shadow-lg shadow-primary-500/30">
               Generate Reports
             </a>
          </div>
        </div>
      </div>
    </div>
  );
}