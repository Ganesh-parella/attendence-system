import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { TableSkeleton } from "../../components/Skeleton"; // Import the skeleton
import { Search, Filter } from "lucide-react";

export default function AllAttendance() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/manager/all");
        setRows(res.data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        // Fake a small delay so user sees the skeleton (feels smoother)
        setTimeout(() => setLoading(false), 500);
      }
    };
    fetchData();
  }, []);

  const filteredRows = rows.filter(r => 
    r.userId?.name.toLowerCase().includes(filter.toLowerCase()) || 
    r.userId?.employeeId.toLowerCase().includes(filter.toLowerCase())
  );

  const StatusBadge = ({ status }) => {
    const styles = {
      present: "bg-emerald-100 text-emerald-700 ring-emerald-600/20",
      late: "bg-amber-100 text-amber-700 ring-amber-600/20",
      absent: "bg-rose-100 text-rose-700 ring-rose-600/20",
      "half-day": "bg-purple-100 text-purple-700 ring-purple-600/20"
    };
    return (
      <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${styles[status] || styles.absent}`}>
        {status.toUpperCase()}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header & Search */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Attendance Logs</h1>
          <p className="text-sm text-gray-500">View and filter daily employee check-ins.</p>
        </div>
        
        <div className="relative w-full sm:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <Search size={16} />
          </div>
          <input 
            placeholder="Search by name or ID..." 
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow shadow-sm"
            value={filter}
            onChange={e => setFilter(e.target.value)}
          />
        </div>
      </div>

      {/* Table Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-6">
            <TableSkeleton />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead className="bg-gray-50/50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Employee</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Time In</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Time Out</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredRows.length > 0 ? filteredRows.map((r) => (
                  <tr key={r._id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                          {r.userId?.name?.charAt(0) || "U"}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{r.userId?.name}</div>
                          <div className="text-xs text-gray-500">{r.userId?.employeeId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{r.date}</td>
                    <td className="px-6 py-4 text-sm font-mono text-gray-600">
                      {r.checkInTime ? new Date(r.checkInTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '-'}
                    </td>
                    <td className="px-6 py-4 text-sm font-mono text-gray-600">
                      {r.checkOutTime ? new Date(r.checkOutTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '-'}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={r.status} />
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                      No records found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}