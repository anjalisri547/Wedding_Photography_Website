import { Helmet } from "react-helmet";
import React, { useState } from 'react';
import { db } from "../../pages/ClientLogin/firebaseConfig";

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState("");

  // Handle subscription form
  const handleSubscribe = async () => {
    if (!email.trim()) return alert("Please enter a valid email");
    try {
      await addDoc(collection(db, "subscriptions"), {
        email,
        timestamp: serverTimestamp()
      });
      alert("Subscribed successfully!");
      setEmail("");
    } catch (err) {
      console.error("Error subscribing:", err);
      alert("Subscription failed. Try again.");
    }
  };

  // Track phone clicks
  const handlePhoneClick = async () => {
    try {
      await addDoc(collection(db, "contacts"), {
        type: "phone",
        timestamp: serverTimestamp()
      });
    } catch (err) {
      console.error("Error tracking phone click:", err);
    }
  };

  // Track email clicks
  const handleEmailClick = async () => {
    try {
      await addDoc(collection(db, "contacts"), {
        type: "email",
        timestamp: serverTimestamp()
      });
    } catch (err) {
      console.error("Error tracking email click:", err);
    }
  };

  return (
    <>
     <Helmet>
      <title>Footer | AnMan Captures</title>
      <meta 
        name="description" 
        content="View the footer section of our wedding photography website — including contact information, social links, and quick navigation." 
      />
    </Helmet>
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2>About Us</h2>
          <p style={{ color: "white", lineHeight: "1.6", fontSize: "14px" }}> 
            We are passionate wedding photographers capturing timeless moments of love, laughter, and celebration. From candid emotions to grand ceremonies, we turn your special day into a beautiful visual story you'll cherish forever.
          </p>

          <div className="contact">
            <span>📞 
              <a href="tel:+919876543210" onClick={handlePhoneClick}>+91 98765 43210</a>
            </span>
            <span>📧 
              <a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=hello@weddinglens.com" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={handleEmailClick}
              >
                hello@weddinglens.com
              </a>
            </span>
          </div>

          <div className="subscribe">
            <input 
              type="email" 
              placeholder="Subscribe for updates" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleSubscribe}>Send</button>
          </div>
        </div>

        <div className="footer-section tweet">
          <h2>Client Love</h2>
          <p>💬 “You captured every emotion so beautifully. We’ll treasure these photos forever!” – Priya & Arjun</p>
          <p>💬 “Absolutely stunning work! You made our day feel magical.” – Meera & Rohan</p>
        </div>

        <div className="footer-section instagram">
          <h2>Instagram</h2>
          <div className="instagram-images">
            <img src="https://images.squarespace-cdn.com/content/v1/58590703e4fcb586c80e4914/1609175124910-IBVBYHE5J9QL1JLF5M8F/AVBlog_15.jpg" alt="Bride & Groom" />
            <img src="https://www.thestatesman.com/wp-content/uploads/2017/12/Virat-Anushka-517_twitter.jpg" alt="Wedding Couple" />
            <img src="https://www.thestatesman.com/wp-content/uploads/2017/12/Virat-Anushka-517_twitter.jpg" alt="Ceremony Moment" />
            <img src="https://www.thestatesman.com/wp-content/uploads/2017/12/Virat-Anushka-517_twitter.jpg" alt="Reception Glam" />
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© WeddingLens Photography</p>
      </div>
    </footer>
    </>
  );
};

export default Footer;
