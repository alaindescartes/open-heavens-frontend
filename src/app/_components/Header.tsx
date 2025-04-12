"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Aurora from "../../Backgrounds/Aurora/Aurora";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    {
      name: "Watch Live",
      path: "https://www.youtube.com/@dunamisedmonton2839",
    },
    { name: "Featuring", path: "#featuring" },
    // { name: "About Open Heavens", path: "#hero-section" },
    { name: "FAQs", path: "#faqs" },
    { name: "Share", path: "/share" },
    { name: "Connect", path: "/connect" },
  ];

  return (
    <header className="w-full top-0 z-50 text-black bg-gradient-to-r from-yellow-400 to-yellow-600 border-b-4 border-yellow-500 shadow-lg fixed">
      {/* Aurora Background */}
      <div className="absolute inset-0 w-full h-full z-[-1] opacity-20">
        <Aurora
          colorStops={["#FFD700", "#FFA500", "#FF4500"]}
          blend={0.5}
          amplitude={3.0}
          speed={1.5}
        />
      </div>

      <div className="container mx-auto px-6 py-4 flex justify-between items-center relative">
        {/* Logo */}
        <a
          href="/"
          className="text-3xl font-extrabold tracking-wide text-black drop-shadow-md"
        >
          Open Heavens
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              className="text-black hover:text-white transition text-lg font-semibold"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-black z-50" onClick={toggleMenu}>
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden bg-yellow-500 shadow-lg absolute w-full left-0 top-full p-6 flex flex-col space-y-4 text-center transition-all duration-300 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.path}
            className="text-black hover:text-white text-lg font-semibold transition"
            onClick={closeMenu}
          >
            {link.name}
          </a>
        ))}
      </div>
    </header>
  );
}

export default Header;
