import React from "react";
import { motion } from "framer-motion";
import Backdrop from "./Backdrop";
// import { Container } from './styles';

const variants = {
  hidden: {
    // oapcity: 0,
    y: "-100vh",
  },
  visible: {
    // opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: { y: "100vh" },
};

export default function Content({ onClose, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e.target.new_song.value);
  };
  return (
    <Backdrop onClose={onClose}>
      <motion.form
        onSubmit={handleSubmit}
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >
        <label htmlFor="new_song">What should I listen to?</label>
        <input name="new_song" id="new_song" placeholder="Enter song name" />
        <motion.button
          whileHover={{ scale: 1.05 }}
          type="submit"
          className="sendBtn hologram"
        >
          Send
        </motion.button>
      </motion.form>
    </Backdrop>
  );
}
