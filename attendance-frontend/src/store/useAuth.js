import { create } from "zustand";
import api, { setAuthToken } from "../services/api";

export const useAuth = create((set) => ({
  user: JSON.parse(localStorage.getItem("user") || "null"),
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  
  login: async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    const { user, token } = res.data;
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    setAuthToken(token);
    set({ user, token, isAuthenticated: true });
  },

  register: async (payload) => {
    const res = await api.post("/auth/register", payload);
    const { user, token } = res.data;
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    setAuthToken(token);
    set({ user, token, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem("user"); 
    localStorage.removeItem("token");
    setAuthToken(null); 
    set({ user: null, token: null, isAuthenticated: false });
  }
}));

// Initialize token
const token = localStorage.getItem("token");
if (token) setAuthToken(token);