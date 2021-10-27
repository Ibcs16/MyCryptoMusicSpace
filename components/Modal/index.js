import React from "react";
import { AnimatePresence } from "framer-motion";
import Content from "./Content";
// import { Container } from './styles';

export default function Modal({ visible, ...others }) {
  return (
    <AnimatePresence initial={false} exitBeforeEnter>
      {visible && <Content {...others} />}
    </AnimatePresence>
  );
}
