import { Helmet } from "react-helmet";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Chatbot from "../../components/ChatBot/Chatbot";
import WorkFeatured from "../../components/WorkFeatured/WorkFeatured";
import Owner from "../../components/Owner/Owner";
import Team from "../../components/Team/Team";
const cards = [
  {
    title: "Magical Manali Wedding Moments",
    btn: "View Memories",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHG9IqISxqbcSn3TL9J-auOjU1pvGC4eqrqw&s"
  },
  {
    title: "Romance in the Hills of Manali",
    btn: "Explore Gallery",
    img: "https://www.shaadidukaan.com/vogue/wp-content/uploads/2025/01/2222.jpg"
  },
  {
    title: "Capturing Love in Manali",
    btn: "See More",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThMsqi1XkZp4-6b6NUJ4ZzWxa6CyqCGjE7zg&s"
  }
];

const Home = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio("/Videos/Music2.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0; // Start muted
    audioRef.current.play().catch(err => console.log("Autoplay blocked:", err));

    const unmuteMusic = () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.2; // Set desired volume
        audioRef.current.play().catch(err => console.log("Play error:", err));
      }
      window.removeEventListener("click", unmuteMusic);
    };

    // Unmute on first user interaction
    window.addEventListener("click", unmuteMusic);

    return () => {
      window.removeEventListener("click", unmuteMusic);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  return (
    <><Helmet>
  <title>Home | AnMan Captures</title>
  <meta 
    name="description" 
    content="Welcome to Your Studio Name – creative wedding photography and cinematic videography capturing your most precious moments." 
  />
</Helmet>
   
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay">
          <h1>Capture Your Perfect Moments</h1>
          <p>Professional Wedding Photography by AnMan Captures</p>
          <a
  href="https://wa.me/9569408420?text=Hi%20I%20want%20to%20chat%20about%20wedding%20photography"
  target="_blank"
  rel="noopener noreferrer"
  className="btn-primary"
>
  Chat With Us
</a>

        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
      
        <h2 style={{ color: "#b43b67" }}>About Us</h2>

        <p className="about-intro">
          We don’t just take photos — we preserve emotions. Every tear, every laugh, every stolen glance deserves to be remembered. That’s why we do what we do.
        </p>
        <div className="about-timeline">
          <h3>📸 Our Journey</h3>
          <ul>
            <li><strong>2018</strong> – First wedding shoot</li>
            <li><strong>2020</strong> – Won “Best Candid Photographer”</li>
            <li><strong>2022</strong> – Covered 100+ weddings</li>
            <li><strong>2025</strong> – Launched AnMan Captures Studio</li>
          </ul>
        </div>
        <div className="about-quote">
          <p>“We don’t chase moments — we wait for them to bloom.”</p>
          <div className="signature">– AnMan Captures</div>
        </div>
      </section>
<WorkFeatured/>
<Owner/>
<Team/>
      {/* Portfolio Preview */}
      <section className="portfolio-preview">
        <h2>Our Portfolio</h2>
        <div className="portfolio-cards">
          {cards.map((card, index) => (
            <div key={index} className="portfolio-card" style={{ backgroundImage: `url(${card.img})` }}>
              <div className="portfolio-card-overlay">
                <h3>{card.title}</h3>
                <Link to="/portfolio" className="btn-secondary">{card.btn}</Link>
              </div>
            </div>
          ))}
        </div>
        <Link to="/portfolio" className="btn-secondary">View Full Gallery</Link>
      </section>

      {/* Services Preview */}
      <section className="services-preview bg-white py-16 px-6 text-center">
        <h2 className="text-4xl font-bold mb-10 text-gray-800">
          <span style={{ color: "#b43b67" }}>Our Wedding Collections</span>
        </h2>

        <div className="services-list grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Package 1 */}
          <div className="service-card bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-shadow">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">The Intimate Vows</h3>
            <p className="text-gray-500 mb-6">
              3-hour coverage • 80+ timeless photos • Online gallery • Personalized slideshow  
            </p>
            <div className="text-pink-600 font-bold text-xl mb-4">₹25,000</div>
            <Link to="/booking">
            <button
  className="book-now-btn"
>
              Book Now
            </button>
            </Link>
          </div>

          {/* Package 2 */}
          <div className="service-card bg-gradient-to-b from-pink-100 to-white rounded-2xl shadow-lg p-8 border-2 border-pink-300 hover:shadow-2xl transition-shadow">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">The Grand Celebration</h3>
            <p className="text-gray-500 mb-6">
              8-hour coverage • 300+ cinematic photos • Premium album • Drone shots  
            </p>
            <div className="text-pink-600 font-bold text-xl mb-4">₹65,000</div>
       <Link to="/booking">
              <button
  className="book-now-btn"
>
              Reserve Your Date
            </button>
            </Link>
          </div>

          {/* Package 3 */}
          <div className="service-card bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-shadow">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">The Royal Affair</h3>
            <p className="text-gray-500 mb-6">
              Full-day coverage • 600+ cinematic photos • Luxury album • Highlight film • Same-day edit  
            </p>
            <div className="text-pink-600 font-bold text-xl mb-4">₹1,20,000</div>
            <Link to="/booking">
            <button
  className="book-now-btn"
>
              Let's Plan
            </button>
            </Link>
          </div>
        </div>

        <div className="mt-12">
          <Link to="/Package" className="btn-explore">
  Explore All Packages
</Link>

        </div>
      </section>

      {/* Testimonials Preview */}
    
<section className="testimonials-preview">
  <h2>What Our Clients Say</h2>

  <div className="testimonial-row">
    <div className="testimonial-card">
      <p>"AnMan Captures made our wedding unforgettable! The photos are stunning."</p>
      <h4>- Priya & Rahul</h4>
    </div>

    <div className="testimonial-card">
      <p>"Professional, friendly, and captured every emotion perfectly."</p>
      <h4>- Sneha & Aman</h4>
    </div>

    <div className="testimonial-card">
      <p>"Amazing experience! Highly recommend for any wedding or event."</p>
      <h4>- Neha & Arjun</h4>
    </div>
  </div>

  <Link to="/testimonials" className="btn-secondary">Read More Reviews</Link>
</section>

      {/* Call To Action */}
      <section className="cta-section">
        <h2>Ready to Capture Your Special Day?</h2>
    <Link
  to="/Booking"
  className="btn-primary btn-large"
  style={{
    backgroundColor: "white",   // background white
    color: "#b43b67",           // text color (contrast)
    border: "2px solid #b43b67" // optional: add border
  }}
>
  Book Now
</Link>


      </section>
       <Chatbot />
       
    </div>
     </>
  );
};

export default Home;
