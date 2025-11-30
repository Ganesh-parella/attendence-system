import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { useAuth } from "../../store/useAuth";
import StatsCard from "../../components/StatsCard";
import { CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

export default function EmployeeDashboard() {
  const { user } = useAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/dashboard/employee").then(res => setData(res.data)).catch(console.error);
  }, []);

  if (!data) return <div className="p-8">Loading...</div>;

  const chartData = [
    { name: "Present", value: data.month.present, color: "#22c55e" },
    { name: "Late", value: data.month.late, color: "#eab308" },
    { name: "Half Day", value: data.month.half || 0, color: "#f97316" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Welcome back, {user?.name}</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 text-sm">
          {new Date().toDateString()}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard title="Present Days" value={data.month.present} icon={CheckCircle} color="green" />
        <StatsCard title="Late Arrivals" value={data.month.late} icon={AlertTriangle} color="yellow" />
        <StatsCard title="Total Hours" value={data.month.totalHours.toFixed(1)} icon={Clock} color="blue" />
        <StatsCard title="Today's Status" value={data.todayStatus?.status?.toUpperCase()} icon={CheckCircle} color={data.todayStatus?.status === 'present' ? 'green' : 'red'} />
      </div>

      {/* Charts & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-6">Attendance Overview</h3>
          <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip cursor={{fill: 'transparent'}} />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
             </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {data.recent.map((rec, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">{rec.date}</p>
                  <p className="text-xs text-gray-500">{new Date(rec.checkInTime).toLocaleTimeString()}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${rec.status === 'present' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {rec.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}