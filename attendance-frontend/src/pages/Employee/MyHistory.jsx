import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { format, parseISO } from "date-fns";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export default function MyHistory() {
  const [rows, setRows] = useState([]);
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));

  useEffect(() => {
    api.get(`/attendance/my-history?month=${month}`).then(res => setRows(res.data.data || [])).catch(console.error);
  }, [month]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Attendance History</h1>
          <p className="text-gray-500">View your past check-ins and check-outs</p>
        </div>
        <input 
          type="month" 
          value={month} 
          onChange={e => setMonth(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none bg-white"
        />
      </div>

      <div className="grid gap-4">
        {rows.length === 0 ? (
          <div className="p-8 text-center text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
            No records found for this month.
          </div>
        ) : (
          rows.map((r) => (
            <div key={r._id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${r.status === 'present' ? 'bg-green-50 text-green-600' : r.status === 'late' ? 'bg-yellow-50 text-yellow-600' : 'bg-red-50 text-red-600'}`}>
                  <Calendar size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{format(parseISO(r.date), "EEEE, d MMMM yyyy")}</h4>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <Clock size={14} />
                    <span>{r.totalHours} hrs logged</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                 <div className="text-right">
                    <p className="text-xs text-gray-500 uppercase">Check In</p>
                    <p className="font-mono text-sm font-medium">{r.checkInTime ? format(parseISO(r.checkInTime), "HH:mm a") : "--:--"}</p>
                 </div>
                 <ArrowRight size={16} className="text-gray-300" />
                 <div className="text-right">
                    <p className="text-xs text-gray-500 uppercase">Check Out</p>
                    <p className="font-mono text-sm font-medium">{r.checkOutTime ? format(parseISO(r.checkOutTime), "HH:mm a") : "--:--"}</p>
                 </div>
                 <div className={`w-24 text-center px-2 py-1 rounded-full text-xs font-bold uppercase ${r.status === 'present' ? 'bg-green-100 text-green-700' : r.status === 'late' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                   {r.status}
                 </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}