import React from "react";
const RecommendSongButton = ({ label, isActive = false, ...others }) => {
  return (
    <button
      className={`recommendBtn ${isActive ? "is-active" : ""}`}
      {...others}
    >
      {label}
    </button>
  );
};

export default RecommendSongButton;
