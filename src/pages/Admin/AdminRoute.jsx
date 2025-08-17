import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // adjust if your auth context is elsewhere

const AdminRoute = ({ children }) => {
  const { currentUser } = useAuth();
  const adminEmail = "admin@example.com"; // <-- change to your email

  if (!currentUser) return <Navigate to="/login" replace />;
  if (currentUser.email !== adminEmail) return <Navigate to="/" replace />;

  return children;
};

export default AdminRoute;
