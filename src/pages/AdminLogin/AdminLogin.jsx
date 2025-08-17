import { Helmet } from "react-helmet";
import React, { useState } from "react";
import { auth } from "../ClientLogin/firebaseConfig"; // ✅ correct import
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import "./AdminLogin.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Set your allowed admin email
  const adminEmail = "srivastavaanjali547@gmail.com"; // <-- change this to your real admin email

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Restrict login/sign-up to admin email only
    if (email !== adminEmail) {
      setError("Only admin can access this page!");
      return;
    }

    try {
      if (isSignUp) {
        // If admin is creating account for first time
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        // If admin is logging in
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate("/admin"); // redirect to Admin page after successful login
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
    <Helmet>
  <title>Admin Login | AnMan Captures</title>
  <meta 
    name="description" 
    content="Login to Your Studio Name admin dashboard to manage website content and client galleries." 
  />
</Helmet>
    <div className="admin-login-page">
      <h2>{isSignUp ? "Admin Sign Up" : "Admin Login"}</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">{isSignUp ? "Sign Up" : "Login"}</button>
        {error && <p className="error">{error}</p>}
      </form>
      <p onClick={() => setIsSignUp(!isSignUp)} className="toggle">
        {isSignUp ? "Already have an account? Login" : "Don't have account? Sign Up"}
      </p>
    </div>
    </>
  );
};

export default AdminLogin;
