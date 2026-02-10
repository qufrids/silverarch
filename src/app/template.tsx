"use client";

import { motion } from "framer-motion";
import { pageTransition } from "@/lib/animations";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={pageTransition}
    >
      {children}
    </motion.div>
  );
}
