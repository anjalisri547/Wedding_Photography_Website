import { Helmet } from "react-helmet";
import React from 'react';
import './HeartEffect.css';

const emojis = ['❤️', '🤍', '❤️','💙','❤️'];

const HeartEffect = () => {
  return (
    <>
    <Helmet>
      <title>Heart Animation | AnMan Captures</title>
      <meta 
        name="description" 
        content="Experience our delightful heart animations — crafted to bring extra charm to your wedding photography website." 
      />
    </Helmet>
    <div className="heart-container">
      {[...Array(20)].map((_, i) => {
        const emoji = emojis[Math.floor(Math.random() * emojis.length)];
        return (
          <div className="emoji-heart" key={i}>
            {emoji}
          </div>
        );
      })}
    </div>
    </>
  );
};

export default HeartEffect;


