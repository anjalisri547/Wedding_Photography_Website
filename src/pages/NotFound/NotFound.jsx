import { Helmet } from "react-helmet";
// src/pages/NotFound/NotFound.jsx
import React from "react";
import "./NotFound.css";

const NotFound = () => {
  return (
    <>
    <Helmet>
  <title>Page Not Found | AnMan Captures</title>
  <meta 
    name="description" 
    content="Oops! The page you are looking for doesn't exist. Go back to Your Studio Name home." 
  />
</Helmet>
    <div className="notfound-container">
      <div className="notfound-content">
        <h1 className="notfound-title">404</h1>
        <h2 className="notfound-subtitle">Oops! Page Not Found</h2>
        <p className="notfound-text">
          The page you are looking for does not exist or has been moved.
        </p>
        <a href="/" className="notfound-btn">Go Back Home</a>
      </div>
      <div className="notfound-animation">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    </>
  );
};

export default NotFound;
