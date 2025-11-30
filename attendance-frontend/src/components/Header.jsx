import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../store/useAuth";

export default function Header(){
  const { user, logout } = useAuth();
  const nav = useNavigate();

  return (
    <div className="header">
      <div className="container" style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div>
          <Link to="/"><strong>AttendanceApp</strong></Link>
        </div>
        <div>
          {!user && <>
            <Link to="/login">Login</Link>
            <Link to="/register" style={{marginLeft:12}}>Register</Link>
          </>}
          {user && <>
            {user.role === "manager" ? <Link to="/manager" style={{marginLeft:12}}>Manager</Link> : <Link to="/dashboard" style={{marginLeft:12}}>Dashboard</Link>}
            <Link to="/profile" style={{marginLeft:12}}>Profile</Link>
            <button className="btn" style={{marginLeft:12}} onClick={()=>{ logout(); nav("/login"); }}>Logout</button>
          </>}
        </div>
      </div>
    </div>
  );
}
