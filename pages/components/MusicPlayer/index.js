import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
const MusicPlayer = ({ songCover, songTitle }) => {
  return (
    <motion.a
      target="_blank"
      whileHover={{ opacity: 0.8 }}
      href="https://audius.co/Drake_/the-weeknd-i-feel-it-coming-315387"
      className="music-player hologram"
    >
      <img alt={songTitle} className="album-cover" src={songCover} />
      <div className="music-info">
        <span className="title">Currently listening</span>
        <span className="description">{songTitle}</span>
      </div>
    </motion.a>
  );
};

export default MusicPlayer;
