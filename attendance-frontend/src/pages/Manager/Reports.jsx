import React, { useState } from "react";
import { Download, FileText, Calendar } from "lucide-react";
import api from "../../services/api"; // imported just in case, though we use direct URL for download

export default function Reports() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const handleDownload = () => {
    // Construct the query URL manually for the browser to trigger download
    const baseUrl = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";
    // We need the token for the API, but browser direct navigation doesn't attach headers easily.
    // OPTION A: If your backend requires Auth for export (it does), we can't just use <a href>.
    // We must fetch with axios (blob) and create a link.
    
    // Let's use the Axios Blob method for security (Passes the JWT)
    api.get(`/manager/export?from=${from}&to=${to}`, { responseType: 'blob' })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `attendance_report_${new Date().toISOString().slice(0,10)}.csv`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch(console.error);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reports & Exports</h1>
        <p className="text-gray-500">Download attendance data for payroll and analysis</p>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-start gap-4 mb-8">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <FileText size={24} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Attendance CSV Export</h3>
            <p className="text-gray-500 text-sm mt-1">Select a date range to download a detailed breakdown of check-in/out times, hours worked, and status for all employees.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">From Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 text-gray-400" size={18} />
              <input 
                type="date" 
                value={from}
                onChange={e => setFrom(e.target.value)}
                className="w-full pl-10 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" 
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 text-gray-400" size={18} />
              <input 
                type="date" 
                value={to}
                onChange={e => setTo(e.target.value)}
                className="w-full pl-10 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" 
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-gray-100">
          <button 
            onClick={handleDownload}
            disabled={!from || !to}
            className="flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors shadow-lg shadow-primary-500/20"
          >
            <Download size={18} />
            <span>Download CSV</span>
          </button>
        </div>
      </div>
    </div>
  );
}