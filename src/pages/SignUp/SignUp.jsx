import { Helmet } from "react-helmet";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaUser, FaLock, FaFacebookF, FaTwitter, FaGoogle } from "react-icons/fa";
import { 
  createUserWithEmailAndPassword, 
  signInWithPopup 
} from "firebase/auth";

import { auth, googleProvider, facebookProvider, twitterProvider } 
  from "../ClientLogin/firebaseConfig";

const ClientSignup = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [signupMessage, setSignupMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      setSignupMessage("Account created successfully! 🎉 Redirecting to Home...");
      setFormData({ email: "", password: "" });

      setTimeout(() => {
        navigate("/"); // Go to home after signup
      }, 1500);
    } catch (error) {
      setSignupMessage(error.message);
    }
  };

  const handleSocialSignup = async (platform) => {
    try {
      let provider;
      if (platform === "Google") provider = googleProvider;
      if (platform === "Facebook") provider = facebookProvider;
      if (platform === "Twitter") provider = twitterProvider;

      const result = await signInWithPopup(auth, provider);
      setSignupMessage(`Welcome ${result.user.displayName || "User"}! Redirecting to Home...`);
      
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      setSignupMessage(error.message);
    }
  };

  return (
    <>
    <Helmet>
  <title>Sign Up | AnMan Captures</title>
  <meta 
    name="description" 
    content="Create an account with Your Studio Name to access your wedding gallery and downloads." 
  />
</Helmet>
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>

        <div className="input-group">
          <FaUser className="input-icon" />
          <input
            type="email"
            name="email"
            placeholder="Type your email"
            value={formData.email}
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

        <button type="submit" className="login-btn">SIGN UP</button>

        <p className="signup-text">Or Sign Up Using</p>

        <div className="social-login">
          <span onClick={() => handleSocialSignup("Facebook")}>
            <FaFacebookF />
          </span>
          <span onClick={() => handleSocialSignup("Twitter")}>
            <FaTwitter />
          </span>
          <span onClick={() => handleSocialSignup("Google")}>
            <FaGoogle />
          </span>
        </div>
      </form>

      {signupMessage && (
        <div className="login-message">
          <p>{signupMessage}</p>
        </div>
      )}
    </div>
    </>
  );
};

export default ClientSignup;
