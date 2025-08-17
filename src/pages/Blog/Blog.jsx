// BlogPage.jsx
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import "./Blog.css";
import { 
  FaFacebookF, 
  FaInstagram, 
  FaTwitter, 
  FaYoutube, 
  FaUser, 
  FaRegCalendarAlt, 
  FaEye, 
  FaLinkedin 
} from "react-icons/fa";
import { db } from "../ClientLogin/firebaseConfig"; 

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import blogsData from "../../Data/weddingBlogs.json";

const Blog = () => {
  const [blogs] = useState(blogsData.articles);

  // Handle Like / Follow / Subscribe actions
  const handleSocialAction = async (platform, action) => {
    try {
      await addDoc(collection(db, "socialActions"), {
        platform,
        action,
        timestamp: serverTimestamp(),
      });
      alert(`${action} successful on ${platform}`);
    } catch (error) {
      console.error("Error storing action:", error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Blog | AnMan Captures</title>
        <meta
          name="description"
          content="Explore wedding photography tips, ideas, and stories on our creative blog."
        />
      </Helmet>

      <div className="blog-page">
        {/* Sidebar */}
        <aside className="blog-sidebar">

          {/* Author Card */}
          <div className="author-card card">
            <img 
              src="https://www.shaadidukaan.com/vogue/wp-content/uploads/2025/01/2222.jpg" 
              alt="Author" 
            />
            <p>Mirrorless cameras offer flexibility and faster shooting. Portable LED lights enhance low-light shots.</p>
          </div>

          {/* Featured Posts */}
          <div className="featured-posts card">
            <h3>Featured Posts:</h3>
            <ul>
              <li>According a funnily until pre-set or arrogant well cheerful</li>
              <li>Overlaid the jeepers uselessly much excluding</li>
            </ul>
          </div>

          {/* Social Icons */}
          <div className="social-icons card">
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer"><FaFacebookF /></a>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
            <a href="https://www.twitter.com" target="_blank" rel="noreferrer"><FaTwitter /></a>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer"><FaLinkedin /></a>
          </div>

          {/* Follow Us */}
          <div className="card follow">
            <h3>Follow Us</h3>
            <ul className="follow-list">
              <li>
                <FaFacebookF /> Facebook <span>12K</span> 
                <button onClick={() => handleSocialAction("Facebook", "Like")}>Like</button>
              </li>
              <li>
                <FaTwitter /> Twitter <span>8K</span> 
                <button onClick={() => handleSocialAction("Twitter", "Follow")}>Follow</button>
              </li>
              <li>
                <FaInstagram /> Instagram <span>20K</span> 
                <button onClick={() => handleSocialAction("Instagram", "Follow")}>Follow</button>
              </li>
              <li>
                <FaYoutube /> YouTube <span>5K</span> 
                <button onClick={() => handleSocialAction("YouTube", "Subscribe")}>Subscribe</button>
              </li>
            </ul>
          </div>

          {/* Popular Posts */}
          <div className="card popular-posts">
            <h3>Popular Posts</h3>
            <ul>
              {blogs.slice(0, 3).map((post, idx) => (
                <li key={idx}>
                  <img src={post.urlToImage} alt={post.title} />
                  <div>
                    <p>{post.title.slice(0, 40)}...</p>
                    <span>{new Date(post.publishedAt).toDateString()}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="card categories">
            <h3>Categories</h3>
            <ul>
              <li><a href="https://www.google.com/search?q=Wedding+Stories" target="_blank" rel="noreferrer">Wedding Stories <span>20</span></a></li>
              <li><a href="https://www.google.com/search?q=Photography+Tips" target="_blank" rel="noreferrer">Photography Tips <span>15</span></a></li>
              <li><a href="https://www.google.com/search?q=Gadgets" target="_blank" rel="noreferrer">Gadgets <span>10</span></a></li>
              <li><a href="https://www.google.com/search?q=Fashion" target="_blank" rel="noreferrer">Fashion <span>12</span></a></li>
              <li><a href="https://www.google.com/search?q=Business" target="_blank" rel="noreferrer">Business <span>8</span></a></li>
              <li><a href="https://www.google.com/search?q=Travel" target="_blank" rel="noreferrer">Travel <span>14</span></a></li>
            </ul>
          </div>

          {/* Tags */}
          <div className="card tags">
            <h3>Tags</h3>
            <div className="tag-list">
              <a href="https://www.google.com/search?q=wedding" target="_blank" rel="noreferrer">#wedding</a>
              <a href="https://www.google.com/search?q=bride" target="_blank" rel="noreferrer">#bride</a>
              <a href="https://www.google.com/search?q=groom" target="_blank" rel="noreferrer">#groom</a>
              <a href="https://www.google.com/search?q=lovestory" target="_blank" rel="noreferrer">#lovestory</a>
              <a href="https://www.google.com/search?q=candid" target="_blank" rel="noreferrer">#candid</a>
              <a href="https://www.google.com/search?q=destination" target="_blank" rel="noreferrer">#destination</a>
              <a href="https://www.google.com/search?q=photography" target="_blank" rel="noreferrer">#photography</a>
              <a href="https://www.google.com/search?q=makeup" target="_blank" rel="noreferrer">#makeup</a>
              <a href="https://www.wedmegood.com/vendors/kanpur/wedding-venues/" target="_blank" rel="noreferrer">#venue</a>
              <a href="https://www.google.com/search?q=rings" target="_blank" rel="noreferrer">#rings</a>
            </div>
          </div>

          {/* Trending Topics */}
          <div className="card trending">
            <h3>Trending Topics</h3>
            <ul>
              <li>Top 10 Wedding Venues in India</li>
              <li>Pre-wedding Shoot Ideas</li>
              <li>Best Bridal Makeup Artists 2025</li>
              <li>Luxury Destination Weddings</li>
              <li>Latest Photography Gadgets</li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="card newsletter">
            <h3>Subscribe</h3>
            <input type="email" placeholder="Your email" />
            <button onClick={() => handleSocialAction("Newsletter", "Subscribe")} style={{ backgroundColor: "#b43b67", color: "#fff" }}>Subscribe Now</button>
          </div>

        </aside>

        {/* Main Blog Feed */}
        <main className="blog-main">
          {blogs.map((post, idx) => (
            <div className="blog-card" key={idx}>
              <img src={post.urlToImage} alt={post.title} className="blog-image" />
              <div className="blog-content">
                <h2>{post.title}</h2>
                <div className="blog-meta">
                  <span><FaUser /> {post.author || "Unknown"}</span> | 
                  <span><FaRegCalendarAlt /> {new Date(post.publishedAt).toDateString()}</span> | 
                  <span><FaEye /> 500 Views</span>
                </div>
                <p>{post.description.slice(0, 150)}... <a href="#">Read more</a></p>
              </div>
            </div>
          ))}
        </main>
      </div>
    </>
  );
};

export default Blog;
