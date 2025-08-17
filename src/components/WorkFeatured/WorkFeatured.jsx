import React from "react";
import "./WorkFeatured.css";

const logos = [
  { 
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBRap3l_TCXAyVXqFiF3EGCUZ_BBZns0CNkA&s", 
    alt: "WedLuxe Magazine" 
  },
  { 
    src: "https://image6.photobiz.com/8933/13_20230419002623_10585511_large.png", 
    alt: "Eternal Weddings" 
  },
  { 
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRFv5EGv-9n29lS-O7I1Gbcb4P5b9oXIpvQA&s", 
    alt: "WedLuxe Films" 
  },
  { 
    src: "https://marketplace.canva.com/EAGPt9nnTYM/1/0/1600w/canva-black-%26-white-aesthetic-photographer-logo-qQm2O4IjVm0.jpg", 
    alt: "Elegant Monogram" 
  },
  { 
    src: "https://images.squarespace-cdn.com/content/v1/5ad8ae4475f9ee9687e894b0/f25044e5-129a-41c1-9252-2b495b22155e/alex+2+-+color_LONG_SHADOW.png", 
    alt: "The Knot" 
  },
  { 
    src: "https://images.squarespace-cdn.com/content/v1/55d3c966e4b075ba970b4a43/1732687585511-NGGY6XSM0CETJA7CW7M0/AMR-Aston-Martin-racing-logo.png?format=1500w", 
    alt: "Martha Stewart Weddings" 
  },
  { 
    src: "https://static1.squarespace.com/static/5244557fe4b0ac7ec68a7449/t/5a920c6571c10b0d651afa50/1731865102578/", 
    alt: "Style Me Pretty" 
  },
  { 
    src: "https://s3.us-east-1.amazonaws.com/cdn.designcrowd.com/blog/93-photography-logos-to-capture-clients/professional-peaceful-logo-design-by-buck-thylacine-designcrowd.png", 
    alt: "Brides Magazine" 
  },
    { 
    src: "https://image5.photobiz.com/8905/17_20230422103636_10223559_large.png", 
    alt: "Style Me Pretty" 
  },
  { 
    src: "https://s3.us-east-1.amazonaws.com/cdn.designcrowd.com/blog/93-photography-logos-to-capture-clients/elegant-simple-logo-design-by-makhi3-designcrowd.png", 
    alt: "Brides Magazine" 
  },
    { 
    src: "https://static.vecteezy.com/system/resources/thumbnails/008/991/031/small_2x/photography-logo-vector.jpg", 
    alt: "Style Me Pretty" 
  },
  { 
    src: "https://t4.ftcdn.net/jpg/02/76/55/89/360_F_276558903_fwN67w7RivuvYNnbLVDsc2WAuHtSv4GR.jpg", 
    alt: "Brides Magazine" 
  },
    { 
    src: "https://s3.us-east-1.amazonaws.com/cdn.designcrowd.com/blog/93-photography-logos-to-capture-clients/elegant-simple-logo-design-by-joshgraph-designcrowd.png", 
    alt: "Style Me Pretty" 
  },
  { 
    src: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/white-profesional-support-bussiness-with-prof-design-template-f4b245a5d97fb104d9c41d0d4152cbc6_screen.jpg?ts=1730039470", 
    alt: "Brides Magazine" 
  }
];

const WorkFeatured = () => {
  return (
    <section className="work-featured-section">
      <h2 className="work-featured-title">Work Featured In</h2>
      <div className="work-featured-logos">
        {logos.map((logo, index) => (
          <div className="logo-item" key={index}>
            <img src={logo.src} alt={logo.alt} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkFeatured;
