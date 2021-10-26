import React from "react";
import Image from "next/image";
const MusicPlayer = ({ songCover, songTitle }) => {
  return (
    <div className="music-player hologram">
      <Image alt={songTitle} className="album-cover" src={songCover} />
      <div className="music-info">
        <span className="title">Currently listening</span>
        <span className="description">{songTitle}</span>
      </div>
    </div>
  );
};

export default MusicPlayer;
