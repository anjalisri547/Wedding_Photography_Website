import { Helmet } from "react-helmet";
import React from "react";
import "./About.css";



const About = () => {
  return (
    <><Helmet>
  <title>About Us | Your Studio Name</title>
  <meta 
    name="description" 
    content="Learn more about Your Studio Name – our journey, our creative team, and our passion for timeless wedding photography." 
  />
</Helmet>
  
    <div className="about-container">
      <div className="floating-hearts"></div>

      {/* Intro Section */}
      <section className="intro">
        <h1>About Us</h1>
        <p>
          We don’t just take photos — we preserve emotions. Every tear, every laugh,
          every stolen glance deserves to be remembered. That’s why we do what we do.
        </p>
      </section>

      {/* Collage Section */}
      <section className="photo-collage">
        <h2>Moments We Cherish</h2>
        <div className="collage-grid">
          {[...Array(10)].map((_, i) => (
            <img
              key={i}
              src={`/images/Gallery${i + 1}.jpeg`}
              alt={`Memory ${i + 1}`}
              className="collage-photo"
              onError={(e) => { e.target.src = '/images/fallback.jpeg'; }}
            />
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline">
        <h2>📸 Our Journey</h2>
        <ul>
          <li><span>2018</span> – First wedding shoot</li>
          <li><span>2020</span> – Won “Best Candid Photographer”</li>
          <li><span>2022</span> – Covered 100+ weddings</li>
          <li><span>2025</span> – Launched AnMan Captures Studio</li>
        </ul>
      </section>

     

      {/* Quote Section */}
      <section className="quote">
        <p>“We don’t chase moments — we wait for them to bloom.”</p>
        <div className="signature">– AnMan Captures</div>
      </section>
     

    </div>
      </>
  );
};

export default About;
