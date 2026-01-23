"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingAnimation() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    // Check if this is the first visit in this session
    const hasVisited = sessionStorage.getItem("hasVisited");
    
    if (hasVisited) {
      setIsLoading(false);
      setHasLoaded(true);
      return;
    }

    // Show loading animation for first visit
    const timer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem("hasVisited", "true");
    }, 1500);

    // Ensure content is ready
    const contentTimer = setTimeout(() => {
      setHasLoaded(true);
    }, 1800);

    return () => {
      clearTimeout(timer);
      clearTimeout(contentTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900"
        >
          <div className="flex flex-col items-center">
            {/* Logo animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative"
            >
              {/* Red square */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 80 }}
                transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
                className="h-20 bg-primary-500 flex items-center justify-center overflow-hidden"
              >
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  className="text-white font-heading text-4xl font-bold"
                >
                  D
                </motion.span>
              </motion.div>
            </motion.div>

            {/* Text reveal */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.7 }}
              className="mt-6 text-center"
            >
              <span className="text-white font-heading text-lg tracking-wider">
                DAVID GUIRGIS
              </span>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="h-0.5 bg-primary-500 mt-2"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
