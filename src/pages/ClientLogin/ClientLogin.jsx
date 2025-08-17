import { Helmet } from "react-helmet";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./ClientLogin.css";
import { FaUser, FaLock, FaFacebookF, FaTwitter, FaGoogle } from "react-icons/fa";
import { 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail 
} from "firebase/auth";
import { auth, googleProvider, facebookProvider, twitterProvider } from "./firebaseConfig";

const ClientLogin = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loginMessage, setLoginMessage] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, formData.username, formData.password);
      setLoginMessage("Login successful! 🎉 Redirecting to Home...");
      setFormData({ username: "", password: "" });

      // Redirect after login
      setTimeout(() => {
        navigate("/"); // Redirect to Home page
      }, 1500); // wait 1.5 seconds to show message
    } catch (error) {
      setLoginMessage(error.message);
    }
  };

  const handleSocialLogin = async (platform) => {
    try {
      let provider;
      if (platform === "Google") provider = googleProvider;
      if (platform === "Facebook") provider = facebookProvider;
      if (platform === "Twitter") provider = twitterProvider;

      const result = await signInWithPopup(auth, provider);

      setLoginMessage(`Welcome ${result.user.displayName || "User"}! Redirecting to Home...`);

      // Redirect after social login
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      setLoginMessage(error.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.username) {
      setLoginMessage("Please enter your email to reset password.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, formData.username);
      setLoginMessage(`✅ Password reset email sent to ${formData.username}. Check your inbox.`);
    } catch (error) {
      setLoginMessage(error.message);
    }
  };

  return (
    <>
    <Helmet>
  <title>Client Login | AnMan Captures</title>
  <meta 
    name="description" 
    content="Login to Your Studio Name client portal to view and download your wedding photos and videos securely." 
  />
</Helmet>
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <div className="input-group">
          <FaUser className="input-icon" />
          <input
            type="email"
            name="username"
            placeholder="Type your email"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <FaLock className="input-icon" />
          <input
            type="password"
            name="password"
            placeholder="Type your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="forgot-link">
          <span onClick={handleForgotPassword} style={{ cursor: "pointer", color: "#b43b67" }}>
            Forgot password?
          </span>
        </div>

        <button type="submit" className="login-btn">LOGIN</button>
       <p className="signup-text">
  Don't have an account?{" "}
  <span 
    onClick={() => navigate("/SignUp")} 
    style={{ cursor: "pointer", color: "#b43b67", fontWeight: "bold" }}
  >
    Sign Up
  </span>
</p>
        <p className="signup-text">Or Sign Up Using</p>

        <div className="social-login">
          <span onClick={() => handleSocialLogin("Facebook")}>
            <FaFacebookF />
          </span>
          <span onClick={() => handleSocialLogin("Twitter")}>
            <FaTwitter />
          </span>
          <span onClick={() => handleSocialLogin("Google")}>
            <FaGoogle />
          </span>
        </div>
      </form>

      {loginMessage && (
        <div className="login-message">
          <p>{loginMessage}</p>
        </div>
      )}
    </div>
    </>
  );
};

export default ClientLogin;
