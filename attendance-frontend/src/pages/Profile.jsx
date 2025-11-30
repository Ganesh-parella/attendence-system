import React from "react";
import { useAuth } from "../store/useAuth";

export default function Profile() {
  const { user } = useAuth();
  
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 h-32"></div>
        <div className="px-8 pb-8">
          <div className="relative -mt-12 mb-6">
            <div className="w-24 h-24 bg-white rounded-full p-1 shadow-lg">
              <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold text-gray-500">
                {user?.name?.charAt(0)}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
             <div>
               <label className="text-sm text-gray-500">Full Name</label>
               <p className="font-medium text-lg text-gray-900">{user?.name}</p>
             </div>
             <div>
               <label className="text-sm text-gray-500">Email Address</label>
               <p className="font-medium text-lg text-gray-900">{user?.email}</p>
             </div>
             <div>
               <label className="text-sm text-gray-500">Employee ID</label>
               <p className="font-medium text-lg text-gray-900">{user?.employeeId}</p>
             </div>
             <div>
               <label className="text-sm text-gray-500">Role</label>
               <p className="font-medium text-lg text-gray-900 capitalize">{user?.role}</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}