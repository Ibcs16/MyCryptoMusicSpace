import { motion } from "framer-motion";
import React from "react";
const RecommendSongButton = ({ label, isActive = false, ...others }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      className={`recommendBtn ${isActive ? "animate-attention" : ""}`}
      {...others}
    >
      {label}
    </motion.button>
  );
};

export default RecommendSongButton;
