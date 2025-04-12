"use client";
import React from "react";
import SplashCursor from "Animations/SplashCursor/SplashCursor";
import { motion } from "framer-motion";

function Artists() {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black to-[#1A1A2E] overflow-hidden">
      {/* Section Title */}
      <div className="text-center text-white mb-8 mt-24">
        <h2 className="text-5xl font-extrabold text-yellow-400">THE ARTISTS</h2>
        <h3 className="text-3xl font-semibold text-gray-300 mt-2">
          THE VOICES OF
        </h3>
        <h3 className="text-3xl font-semibold text-gray-300">PRAISE & FAITH</h3>
      </div>

      {/* Image Grid */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 max-w-6xl">
        {[...Array(7)].map((_, index) => (
          <motion.div
            key={index}
            className="relative flex items-center justify-center w-44 h-44 md:w-56 md:h-56 bg-gray-900 bg-opacity-70 rounded-lg shadow-xl transition-transform duration-300 hover:scale-105"
            // Wiggle on hover
            whileHover={{
              y: [0, -5, 5, 0],
              transition: {
                repeat: Infinity,
                duration: 0.8,
                ease: "easeInOut",
              },
            }}
          >
            <img
              src={`/h${index + 1}.jpg`}
              alt={`Artist ${index + 1}`}
              className="w-full h-full object-cover rounded-lg"
            />
          </motion.div>
        ))}
        {/* <SplashCursor /> */}
      </div>
    </section>
  );
}

export default Artists;
