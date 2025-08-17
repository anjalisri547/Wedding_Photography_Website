import React from "react";
import "./Team.css";

const teamMembers = [
  {
    name: "Puja Tunious",
    role: "Creative Director",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzXF91Mi3v6fPx831uhy1HjmMirbH0IMeRJQ&s", // Replace with actual image path
  },
  {
    name: "Boris",
    role: "Studio Assistant",
    img: "https://media.istockphoto.com/id/1388253782/photo/positive-successful-millennial-business-professional-man-head-shot-portrait.jpg?s=612x612&w=0&k=20&c=uS4knmZ88zNA_OjNaE_JCRuq9qn3ycgtHKDKdJSnGdY=",
  },
  {
    name: "Saaji",
    role: "Video Lead",
    img: "https://media.gettyimages.com/id/1469991892/photo/business-woman-talking-to-a-colleague.jpg?s=612x612&w=gi&k=20&c=BmmK68lHeyyJfoCvcsucxtRtb4kWboHvXLnTSGZFe7c=",
  },
  {
    name: "Puneet Sahni",
    role: "Business Manager",
    img: "https://images.unsplash.com/flagged/photo-1553642618-de0381320ff3?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGRpcmVjdG9yfGVufDB8fDB8fHww",
  }
];

const Team = () => {
  return (
    <div className="team-section">
      <h1 className="team-heading">Our Team</h1>
      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <div className="team-card" key={index}>
            <img 
              src={member.img} 
              alt={member.name} 
              onError={(e) => { e.target.src = '/images/fallback.jpeg'; }}
            />
            <h2>{member.name}</h2>
            <p>{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
