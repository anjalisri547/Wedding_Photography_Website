import { Helmet } from "react-helmet";
import React, { useState } from "react";
import "./Contact.css";
import { FaCameraRetro, FaPhoneAlt, FaMapMarkerAlt, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../ClientLogin/firebaseConfig"; // Path your Firebase config

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    weddingDate: "",
    contactMethod: "Email",
    package: "Full Wedding",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Store data in Firestore
      await addDoc(collection(db, "contacts"), {
        ...formData,
        createdAt: serverTimestamp()
      });

      alert(`📩 Thanks ${formData.name}, we’ll contact you via ${formData.contactMethod}!`);

      // Reset form
      setFormData({
        name: "",
        email: "",
        weddingDate: "",
        contactMethod: "Email",
        package: "Full Wedding",
        message: ""
      });
    } catch (error) {
      console.error("Error saving contact form:", error);
      alert("❌ Something went wrong. Please try again.");
    }
  };

  return (
    <>
    <Helmet>
  <title>Contact Us | AnMan Captures</title>
  <meta 
    name="description" 
    content="Get in touch with Your Studio Name – book your wedding photography and videography session today." 
  />
</Helmet>
    <div className="contact-page">
      {/* Top Section */}
      <div className="contact-header">
        <h1>Let's Capture Your Special Day</h1>
        <p>Tell us about your wedding — we’ll get back to you quickly!</p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="name" 
            placeholder="Enter your name" 
            value={formData.name} 
            onChange={handleChange}
            required 
          />
          <input 
            type="email" 
            name="email" 
            placeholder="Enter your email address" 
            value={formData.email} 
            onChange={handleChange}
            required 
          />
          <input 
            type="date" 
            name="weddingDate" 
            value={formData.weddingDate} 
            onChange={handleChange}
            required 
          />
          <select name="contactMethod" value={formData.contactMethod} onChange={handleChange}>
            <option>Email</option>
            <option>Phone Call</option>
            <option>WhatsApp</option>
            <option>Zoom Meeting</option>
          </select>
          <select name="package" value={formData.package} onChange={handleChange}>
            <option>Full Wedding</option>
            <option>Engagement Session</option>
            <option>Pre-Wedding Shoot</option>
            <option>Elopement</option>
          </select>
          <textarea 
            name="message" 
            placeholder="Share your wedding details..." 
            value={formData.message} 
            onChange={handleChange} 
          />
          <button type="submit" className="submit-btn">SEND MESSAGE</button>
        </form>
      </div>

      {/* Bottom Section */}
      <div className="contact-info">
        <div className="info-card">
          <FaPhoneAlt className="info-icon" />
          <h3>CALL US</h3>
          <p>+1 (555) 987-6543</p>
          <p>+1 (555) 321-4321</p>
          <a href="https://wa.me/15559876543" className="whatsapp-btn">
            <FaWhatsapp /> Chat on WhatsApp
          </a>
        </div>

        <div className="info-card">
          <FaMapMarkerAlt className="info-icon" />
          <h3>STUDIO LOCATION</h3>
          <p>DreamLens Wedding Photography</p>
          <p>1234 Sunset Blvd, Los Angeles, CA</p>
          <a 
            href="https://maps.google.com?q=1234+Sunset+Blvd+Los+Angeles+CA" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Get Directions
          </a>
        </div>

        <div className="info-card">
          <FaInstagram className="info-icon" />
          <h3>FOLLOW US</h3>
          <a href="https://www.instagram.com/abhianjali_2111?igsh=enE1cW9ld2JnZGlm" target="_blank" rel="noopener noreferrer">
            Instagram Portfolio
          </a>
          <a href="https://pinterest.com/yourstudio" target="_blank" rel="noopener noreferrer">
            Wedding Inspiration
          </a>
        </div>
      </div>
    </div>
    </>
  );
};

export default Contact;
