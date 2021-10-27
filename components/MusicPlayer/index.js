import React from "react";

import { motion } from "framer-motion";
const MusicPlayer = ({ songCover, songTitle }) => {
  return (
    <motion.a
      target="_blank"
      whileHover={{ opacity: 0.8 }}
      href="https://audius.co/Drake_/the-weeknd-i-feel-it-coming-315387"
      className="px-1 py-1 fixed top-4 right-8 md:right-0 md:relative md:flex md:py-3 md:px-6 md:top-auto md:right-auto items-center rounded-3xl hologram bg-animated animate-bg "
    >
      <img
        alt={songTitle}
        className="mr-0 md:mr-4 rounded-full h-11 w-11 border-white border filter drop-shadow-md"
        src={songCover}
      />
      <div className="hidden md:flex flex-col">
        <span className="title-xs drop-shadow-md">Currently listening</span>
        <span className="body-sm drop-shadow-md">{songTitle}</span>
      </div>
    </motion.a>
  );
};

export default MusicPlayer;
