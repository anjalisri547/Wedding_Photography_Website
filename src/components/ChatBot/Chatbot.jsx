import { Helmet } from "react-helmet";
import React, { useState, useEffect } from "react";

import { db } from "../../pages/ClientLogin/firebaseConfig";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";
import "./Chatbot.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const toggleChat = () => setIsOpen(!isOpen);

  // Load messages from Firebase in real-time
  useEffect(() => {
    const q = query(collection(db, "chatbot-messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => doc.data());
      setMessages(msgs);
    });
    return () => unsubscribe();
  }, []);

  // Mapping of questions to replies
  const replies = {
    "wedding photography packages":
      "We offer multiple packages starting at ₹25,000. Would you like a detailed brochure?",
    "pre-wedding shoots":
      "Yes! We offer pre-wedding shoots at beautiful locations. Do you have a venue in mind?",
    "25,000 package":
      "The ₹25,000 package includes full-day coverage, edited photos, and an album. Want me to share full details?",
    "available":
      "Please share your event date — we'll confirm our availability quickly!",
    "latest wedding albums":
      "Sure! You can view our latest wedding albums here: [Add Link]",
    "destination weddings":
      "Yes, we do destination weddings across India and abroad. Where is your event?",
    "confirm my booking":
      "To confirm your booking, we take a 30% advance payment. Shall I connect you to our booking manager?",
    "customize my package":
      "Absolutely! We can customize any package to fit your needs. What changes do you have in mind?"
  };

  const getBotReply = (userText) => {
    const text = userText.toLowerCase();
    for (let key in replies) {
      if (text.includes(key)) {
        return replies[key];
      }
    }
    return "Thanks for reaching out! We’ll contact you soon 📸";
  };

  const handleSend = async (customText) => {
  const textToSend = customText || input;
  if (!textToSend.trim()) return;

  setInput("");
  try {
    const botReply = getBotReply(textToSend);

    // Store both user question and bot reply in ONE document
    await addDoc(collection(db, "chatbot-interactions"), {
      userQuestion: textToSend,
      botReply: botReply,
      timestamp: serverTimestamp()
    });

    // Update local chat immediately
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: textToSend },
      { sender: "bot", text: botReply }
    ]);
  } catch (err) {
    console.error("Error storing messages:", err);
  }
};


  const faqQuestions = [
    "What are your wedding photography packages?",
    "Do you offer pre-wedding shoots?",
    "What’s included in the ₹25,000 package?",
    "Are you available on [date]?",
    "Can I see your latest wedding albums?",
    "Do you do destination weddings?",
    "How do I confirm my booking?",
    "Can I customize my package?"
  ];

  const botQuestions = [
    "Which event are you planning to capture? (Wedding / Pre-wedding / Birthday / Other)",
    "What’s your event date and location?",
    "How many guests or how big is the event?",
    "What kind of style do you like? (Candid / Traditional / Cinematic)",
    "Do you also need videography along with photos?",
    "What is your estimated budget range?",
    "Would you like to see our sample albums or video reels?",
    "Should I connect you directly with our booking manager?"
  ];

  return (
    <>
    <Helmet>
      <title>Chatbot | AnMan Captures</title>
      <meta 
        name="description" 
        content="Instantly connect with us using our AI-powered chatbot. Get quick answers about our wedding photography services." 
      />
    </Helmet>
    <div className="chatbot-wrapper">
      {isOpen && (
        <div className="chatbot-box">
          <div className="chatbot-header">
            <span>Wedding Photography Assistant</span>
            <button onClick={toggleChat}>×</button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-msg ${msg.sender}`}>
                {msg.text.split("\n").map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            ))}
          </div>

          <div className="chatbot-faq">
            <h4>Common Questions</h4>
            <div className="faq-buttons">
              {faqQuestions.map((q, idx) => (
                <button key={idx} onClick={() => handleSend(q)}>
                  {q}
                </button>
              ))}
            </div>

            <h4>We Can Ask You...</h4>
            <div className="faq-buttons">
              {botQuestions.map((q, idx) => (
                <button key={idx} onClick={() => handleSend(q)}>
                  {q}
                </button>
              ))}
            </div>
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              placeholder="Type your message..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={() => handleSend()}>Send</button>
          </div>
        </div>
      )}

      <div className="chatbot-toggle" onClick={toggleChat}>
        {isOpen ? "−" : "💬"}
      </div>
    </div>
    </>
  );
};

export default Chatbot;
