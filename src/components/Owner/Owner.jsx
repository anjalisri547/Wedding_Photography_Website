
import React from "react";
import "./Owner.css";


const Owner = () => {
  return (
    <div className="owner-page">
      {/* Owner Info Section */}
      <div className="owner-container">
        <div className="owner-info">
          <h1>Meet Our Founder</h1>
          <h2>Anmol Manchanda</h2>
          <p>
            Anmol Manchanda is the visionary behind <strong>AnMan Captures</strong>. 
            With over 7 years of experience in capturing timeless wedding stories, 
            Anmol has transformed photography into an art form that goes beyond 
            pictures — it’s about emotions, moments, and memories that last a lifetime.
          </p>
          <p>
            Under his leadership, AnMan Captures has grown into one of the most 
            trusted names in wedding photography, blending creativity, 
            storytelling, and technology to create magic.
          </p>
        </div>

        <div className="owner-image">
          <img 
            src="/images/owner.jpg" 
            alt="Anmol Manchanda - Founder of AnMan Captures" 
            onError={(e) => { e.target.src = 'https://www.shutterstock.com/image-photo/happy-mid-aged-business-man-600nw-2307212331.jpg'; }}
          />
        </div>
      </div>

      
      
    </div>
  );
};

export default Owner;
