import { Helmet } from "react-helmet";
import React, { useEffect, useState } from "react";
import { fetchCollection } from "../../services/firestoreCrud";
import "./Portfolio.css";

const Portfolio = () => {
  const [sections, setSections] = useState([]);
  const [imageIndexes, setImageIndexes] = useState({}); // Track current image per section

  // Hero button animation
  const buttonTexts = [
    "Book Your Shoot 📸",
    "Capture The Moment ❤",
    "Freeze Your Love ⏳",
    "Make Memories 🌸",
    "Frame The Smile 😊",
    "Tie The Knot in Style 💍"
  ];
  const [btnIndex, setBtnIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setBtnIndex((prev) => (prev + 1) % buttonTexts.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Load portfolio sections from Firestore
  useEffect(() => {
    const loadSections = async () => {
      const data = await fetchCollection("portfolioSections");
      const sortedData = data.sort(
        (a, b) => (a.sectionOrder || 0) - (b.sectionOrder || 0)
      );
      setSections(sortedData);

      // Initialize imageIndexes for each section
      const indexes = {};
      sortedData.forEach((_, idx) => {
        indexes[idx] = 0;
      });
      setImageIndexes(indexes);
    };
    loadSections();
  }, []);

  // Auto-cycle images for each section every 4 seconds (single interval approach)
  useEffect(() => {
    if (sections.length === 0) return;

    const interval = setInterval(() => {
      setImageIndexes((prev) => {
        const newIndexes = {};
        sections.forEach((section, idx) => {
          newIndexes[idx] = section.images?.length
            ? (prev[idx] + 1) % section.images.length
            : 0;
        });
        return newIndexes;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [sections]);

  return (
  <>
    <Helmet>
      <title>Portfolio | AnMan Captures</title>
      <meta 
        name="description" 
        content="Explore our wedding photography and cinematography portfolio showcasing love stories beautifully captured." 
      />
    </Helmet>

    <div className="page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>
            Capturing <br /> <span>Your Love Story</span>
          </h1>
          <button className="btn-primary">{buttonTexts[btnIndex]}</button>
        </div>
      </section>

      {/* Dynamic Portfolio Sections */}
      {sections.length > 0 &&
        sections.map((section, index) => {
          const isEven = index % 2 === 0;
          const currentIndex = imageIndexes[index] ?? 0;
          const imageUrl = section.images?.[currentIndex] || "";

          return (
            <section key={index} className="info-section">
              {isEven ? (
                <>
                  <div
                    className="info-image"
                    style={{ backgroundImage: `url(${imageUrl})` }}
                  ></div>
                  <div className="info-text">
                    <h2>{section.title}</h2>
                    <p>{section.subtitle}</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="info-text">
                    <h2>{section.title}</h2>
                    <p>{section.subtitle}</p>
                  </div>
                  <div
                    className="info-image"
                    style={{ backgroundImage: `url(${imageUrl})` }}
                  ></div>
                </>
              )}
            </section>
          );
        })}

      {/* Optional fallback static section if no data */}
      {sections.length === 0 && (
        <StaticSection
          images={[
            "https://png.pngtree.com/thumb_back/fh260/background/20250512/pngtree-royal-indian-wedding-couple-image_17272717.jpg"
          ]}
          title="Celebrate Your Love"
          subtitle="With Stunning Photography"
          reverse={false}
        />
      )}
    </div>
  </>
);
};

// Fallback static section component
const StaticSection = ({ images, title, subtitle, reverse }) => (
  <section className="info-section">
    {reverse ? (
      <>
        <div className="info-text">
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
        <div
          className="info-image"
          style={{ backgroundImage: `url(${images[0]})` }}
        ></div>
      </>
    ) : (
      <>
        <div
          className="info-image"
          style={{ backgroundImage: `url(${images[0]})` }}
        ></div>
        <div className="info-text">
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
      </>
    )}
  </section>
);

export default Portfolio;
