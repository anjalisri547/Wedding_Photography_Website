// src/App.jsx

import React, { Suspense, lazy, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import HeartEffect from "./components/HearEffect/HeartEffect";
import { onAuthStateChanged } from "firebase/auth"; 
import { auth } from "./pages/ClientLogin/firebaseConfig"; // adjust path if needed
import LivePreviews from "./pages/LivePreviews/LivePreviews";

// Lazy loaded pages (better performance)
const Home = lazy(() => import("./pages/Home/Home"));
const About = lazy(() => import("./pages/About/About"));
const Portfolio = lazy(() => import("./pages/Portfolio/Portfolio"));
const Services = lazy(() => import("./pages/Services/Services"));
const Blog = lazy(() => import("./pages/Blog/Blog"));
const Testimonials = lazy(() => import("./pages/Testimonials/Testimonials"));
const Contact = lazy(() => import("./pages/Contact/Contact"));
const Booking = lazy(() => import("./pages/Booking/Booking"));
const Package = lazy(() => import("./pages/Package/Package"));

const ClientLogin = lazy(() => import("./pages/ClientLogin/ClientLogin"));
const Admin = lazy(() => import("./pages/Admin/Admin"));
const AdminLogin = lazy(() => import("./pages/AdminLogin/AdminLogin"));
const SignUp = lazy(() => import("./pages/SignUp/SignUp"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));
const SmartTagging = lazy(() => import("./components/SmartTagging"));

// Protected route component
function ProtectedRoute({ user, allowedEmail, children }) {
  if (!user) return <Navigate to="/admin-login" replace />;
  if (user.email !== allowedEmail) return <Navigate to="/" replace />;
  return children;
}

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const adminEmail = "srivastavaanjali547@gmail.com"; // your admin email

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Navbar />
      <Suspense fallback={<div style={{ textAlign: "center", marginTop: "2rem" }}>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/services" element={<Services />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/package" element={<Package />} />
          <Route path="/live-previews" element={<LivePreviews />} />

         
        

          <Route path="/client-login" element={<ClientLogin />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/smart-tagging" element={<SmartTagging />} />

          {/* Protected Admin Route */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute user={currentUser} allowedEmail={adminEmail}>
                <Admin />
              </ProtectedRoute>
            } 
          />

          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
       
      <HeartEffect />
      <Footer />
    </Router>
  );
}

export default App;
