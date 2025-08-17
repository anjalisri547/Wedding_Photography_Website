
import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

import { FaFacebookF, FaTwitter, FaInstagram, FaSnapchatGhost } from "react-icons/fa";

const Navbar = () => {
  return (
    <>
      {/* TopNav1 */}
      <div className="topnav1">
        <div className="topnav1-left">
          <Link to="/" className="brand-name">AnMan Captures</Link>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://snapchat.com" target="_blank" rel="noopener noreferrer" aria-label="Snapchat"><FaSnapchatGhost /></a>
          </div>
        </div>

        <div className="topnav1-right">
          <Link to="/booking" className="book-now-btn">Book Now</Link>
        </div>
      </div>

      {/* TopNav2 */}
      <nav className="topnav2">
        <ul>
         
          <li><NavLink to="/portfolio" activeclassname="active">Gallery</NavLink></li>
          <li><NavLink to="/Package" activeclassname="active">Packages</NavLink></li>
          <li><NavLink to="/testimonials" activeclassname="active">Testimonials</NavLink></li>
          <li><NavLink to="/blog" activeclassname="active">Blog</NavLink></li>
          <li><NavLink to="/booking" activeclassname="active">Booking</NavLink></li>
          <li><NavLink to="/contact" activeclassname="active">Contact</NavLink></li>
          <li><NavLink to="/live-previews" activeclassname="active">LivePreviews</NavLink></li>
          <li><NavLink to="/client-login" activeclassname="active">ClientLogin</NavLink></li>
          <li className="admin-menu">
          <Link to="/admin-login">AdminLogin</Link>
        </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
