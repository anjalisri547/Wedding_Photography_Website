import { Helmet } from "react-helmet";
import React, { useState, useEffect, useRef } from "react";

import { db } from "../ClientLogin/firebaseConfig";
import { collection, doc, getDoc, setDoc, updateDoc, arrayUnion, increment } from "firebase/firestore";
import "./LivePreview.css";
import {
  FaFacebookF,
  FaPinterestP,
  FaTwitter,
  FaWhatsapp,
  FaUser,
  FaRegCalendarAlt,
  FaEye,
  FaQuoteLeft,
  FaThumbsUp,
} from "react-icons/fa";

const LivePreviews = () => {
  const [videos, setVideos] = useState([]);
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});
  const [commentInputs, setCommentInputs] = useState({});
  const videoRefs = useRef([]);

  useEffect(() => {
    fetch("/Videos.json")
      .then((res) => res.json())
      .then(async (data) => {
        setVideos(data);
        const initialLikes = {};
        const initialComments = {};
        for (let i = 0; i < data.length; i++) {
          const videoDoc = doc(db, "videos", `video-${i}`);
          const docSnap = await getDoc(videoDoc);
          if (!docSnap.exists()) {
            await setDoc(videoDoc, { likes: 0, comments: [] });
            initialLikes[i] = 0;
            initialComments[i] = [];
          } else {
            const videoData = docSnap.data();
            initialLikes[i] = videoData.likes || 0;
            initialComments[i] = videoData.comments || [];
          }
        }
        setLikes(initialLikes);
        setComments(initialComments);
      })
      .catch((err) => console.error("Error loading videos.json:", err));
  }, []);

  const handlePlay = (index) => {
    videoRefs.current.forEach((video, i) => {
      if (video && i !== index) video.pause();
    });
  };

  const handleLike = async (index) => {
    const videoDoc = doc(db, "videos", `video-${index}`);
    await updateDoc(videoDoc, { likes: increment(1) });
    setLikes((prev) => ({ ...prev, [index]: prev[index] + 1 }));
  };

  const handleCommentChange = (index, value) => {
    setCommentInputs((prev) => ({ ...prev, [index]: value }));
  };

  const handleAddComment = async (index) => {
    const text = (commentInputs[index] || "").trim();
    if (!text) return;
    const videoDoc = doc(db, "videos", `video-${index}`);
    await updateDoc(videoDoc, {
      comments: arrayUnion(text),
    });
    setComments((prev) => ({
      ...prev,
      [index]: [...(prev[index] || []), text],
    }));
    setCommentInputs((prev) => ({ ...prev, [index]: "" }));
  };

  if (!videos || videos.length === 0) {
    return <div className="loading">Loading videos...</div>;
  }

  return (
   <>
      <Helmet>
        <title>Live Previews | AnMan Captures</title>
        <meta
          name="description"
          content="Watch live wedding preview videos, curated and recommended by our studio."
        />
      </Helmet>
      
 <div className="wbp">
      <p className="wbp-breadcrumb">
        <a href="/">Home</a>
        <span className="sep">›</span>
        <span>Live Previews</span>
      </p>

      <div className="wbp-grid">
        {videos.map((videoItem, index) => (
          <div key={index} className="video-card">
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              src={videoItem.video}
              controls
              loop
              onPlay={() => handlePlay(index)}
              className="live-preview-video"
            />
            <div className="video-overlay">
              <span>{videoItem.duration || "00:00"}</span>
              {videoItem.recommended && (
                <span className="recommended">🌟 Recommended</span>
              )}
            </div>

            <div className="video-content">
              <h1 className="post-title">💍 {videoItem.title}</h1>
              <div className="post-meta">
                <span><FaUser /> By Studio Team |</span>
                <span><FaRegCalendarAlt /> {videoItem.date} |</span>
                <span><FaEye /> {videoItem.views} Views</span>
              </div>
              <p>{videoItem.article || "No content available"}</p>

              <div className="interaction-buttons">
                <button onClick={() => handleLike(index)} className="like-btn">
                  <FaThumbsUp /> {likes[index] || 0}
                </button>
              </div>

              <div className="comments-section">
                <h3>Comments ({comments[index]?.length || 0})</h3>
                <div className="comment-list">
                  {comments[index]?.map((cmt, i) => (
                    <p key={i} className="comment">{cmt}</p>
                  ))}
                </div>
                <div className="comment-input">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    value={commentInputs[index] || ""}
                    onChange={(e) => handleCommentChange(index, e.target.value)}
                  />
                  <button onClick={() => handleAddComment(index)}>Post</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default LivePreviews;
