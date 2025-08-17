import { Helmet } from "react-helmet";
import React, { useState, useEffect } from "react";
import { fetchCollection } from "../../services/firestoreCrud"; // Make sure path is correct
import "./Package.css";
import { Link } from "react-router-dom";
const Package = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPackages = async () => {
      try {
        const data = await fetchCollection("packages");
        setPackages(data);
      } catch (err) {
        console.error("Error fetching packages:", err);
      } finally {
        setLoading(false);
      }
    };

    loadPackages();
  }, []);

  if (loading) {
    return <div className="loading">Loading packages...</div>;
  }

  if (!packages || packages.length === 0) {
    return <div className="no-packages">No packages available.</div>;
  }

  return (
    <>
    <Helmet>
  <title>Wedding Packages | AnMan Captures</title>
  <meta 
    name="description" 
    content="Choose from our customized wedding photography and videography packages to suit your style and budget." 
  />
</Helmet>
    <section className="packages-section">
      <h2>Our Packages</h2>
      <div className="packages-container">
        {packages.map((pkg) => (
          <div key={pkg.id} className="package-card">
            <h3>{pkg.title}</h3>
            <p className="package-price">₹ {pkg.price}</p>
            <p className="package-description">{pkg.description}</p>
            <ul className="package-features">
              {Array.isArray(pkg.features) 
                ? pkg.features.map((feature, idx) => <li key={idx}>{feature}</li>)
                : <li>{pkg.features || "N/A"}</li>
              }
            </ul>
            {pkg.image && <img src={pkg.image} alt={pkg.title} width="100%" />}
           <Link to="/Booking" className="btn-primary">
  Book Now
</Link>
          </div>
        ))}
      </div>
    </section>
    </>
  );
};

export default Package;
