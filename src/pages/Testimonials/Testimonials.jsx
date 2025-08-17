import { Helmet } from "react-helmet";
import React, { useState, useEffect } from "react";
import { fetchCollection } from "../../services/firestoreCrud";
import "./Testimonials.css";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const loadTestimonials = async () => {
      const data = await fetchCollection("testimonials");
      setTestimonials(data);
    };
    loadTestimonials();
  }, []);

  return (
    <>
    <Helmet>
  <title>Testimonials | AnMan Captures</title>
  <meta 
    name="description" 
    content="Hear from happy couples – client testimonials about their wedding photography experience with Your Studio Name." 
  />
</Helmet>
    <div className="testimonial-section">
      <h2 className="testimonial-main-heading">Customer Testimonials</h2>
      <p className="testimonial-description">
        See how our clients describe their experience with us.
      </p>
      
      <div className="testimonial-container">
        {testimonials.map((t) => (
          <div key={t.id} className="testimonial-card">
            <div className="testimonial-top-bar">
              <h3>{t.name}</h3>
              <p>{t.role}</p>
            </div>

            {t.url && (
              <div className="testimonial-image">
                <img src={t.url} alt={t.name} />
              </div>
            )}

            <div className="testimonial-body">
              <div className="testimonial-title">{t.title}</div>
              <p>{t.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
