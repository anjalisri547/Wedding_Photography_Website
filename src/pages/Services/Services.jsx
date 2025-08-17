import { Helmet } from "react-helmet";
import React, { useState } from "react";


const Services = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    package: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking Details:", formData);
    alert("Thank you for booking with us! We'll contact you soon.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      date: "",
      package: "",
      message: ""
    });
  };

  return (
    <>
    <Helmet>
  <title>Services | AnMan Captures</title>
  <meta 
    name="description" 
    content="Discover our photography and videography services – premium wedding coverage, pre-wedding shoots, cinematic films, and more." 
  />
</Helmet>
    <section className="booking-section">
      <div className="booking-container">
        <h2>Book Your <span>Dream Wedding Shoot</span></h2>
        <p className="subtitle">
          Reserve your date now — let's capture your most beautiful moments.
        </p>
        <form onSubmit={handleSubmit} className="booking-form">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          <select
            name="package"
            value={formData.package}
            onChange={handleChange}
            required
          >
            <option value="">Select Package</option>
            <option value="intimate">The Intimate Vows</option>
            <option value="grand">The Grand Celebration</option>
            <option value="royal">The Royal Affair</option>
          </select>
          <textarea
            name="message"
            placeholder="Any special requests or notes?"
            value={formData.message}
            onChange={handleChange}
            rows="4"
          ></textarea>
          <button type="submit" className="booking-btn">
            Reserve Now
          </button>
        </form>
      </div>
    </section>
    </>
  );
};

export default Services;