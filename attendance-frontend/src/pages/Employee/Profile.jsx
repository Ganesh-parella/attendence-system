import React from "react";
import { useAuth } from "../../store/useAuth";

export default function Profile(){
  const { user } = useAuth();
  return (
    <div>
      <h2>Profile</h2>
      <div className="card">
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Role:</strong> {user?.role}</p>
        <p><strong>Employee ID:</strong> {user?.employeeId}</p>
      </div>
    </div>
  );
}
