"use client";

import { useRef, useState } from "react";
import Artists from "./_components/Artists";
import HeroSection from "./_components/HeroSection";
import RegisterButton from "./_components/RegisterButton";
import Faqs from "./_components/Faqs";

export default function Home() {
  const heroRef = useRef<HTMLElement | null>(null);
  const [showModal, setShowModal] = useState(false);

  const scrollToHero = () => {
    const hero = document.getElementById("hero-section");
    if (hero) {
      hero.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full">
      {/* Show modal when Register Now is clicked */}
      {showModal && <RegisterButton onClose={() => setShowModal(false)} />}

      {/* Hero Section */}
      <div className="relative w-full h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-fixed bg-cover bg-center"
          style={{ backgroundImage: "url('/concert.jpg')" }}
        ></div>
        <div className="relative z-10">
          <HeroSection onRegisterClick={() => setShowModal(true)} />
        </div>
      </div>

      {/* Second Section */}
      <div
        className="relative w-full h-screen flex items-center justify-center bg-white scroll-mt-24 px-6 lg:px-20 mt-10 md:mt-0 mb-14"
        id="hero-section"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-6xl">
          {/* Text Section */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h3 className="text-4xl font-extrabold text-yellow-500 mb-4">
              2025 IS THE YEAR! OUR YEAR OF POSSIBILITIES AND MORE! 🎉
            </h3>
            <h1 className="text-5xl font-bold text-black mb-6">
              COME JOIN US AND LET'S END THIS YEAR WITH A BIG BANG!
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              New to Open Heavens? Get a sneak peek of what's in store for Open
              Heavens 2024, re-live the unforgettable experience of 2024, as we
              step into 2025 you don't want to miss!
            </p>
            <button
              onClick={scrollToHero}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:cursor-pointer"
            >
              GRAB A FREE TICKET
            </button>
          </div>

          {/* Video Placeholder */}
          <div className="lg:w-1/2 flex justify-center mt-8 lg:mt-0">
            <div className="relative w-[90%] lg:w-[80%] h-60 lg:h-96 rounded-lg overflow-hidden bg-gray-300 flex items-center justify-center shadow-xl">
              <span className="text-gray-700 text-xl">Video Placeholder</span>
            </div>
          </div>
        </div>
      </div>

      {/* Artists section */}
      <div id="featuring">
        <Artists />
      </div>
      {/* faqs section */}
      <div id="faqs">
        <Faqs />
      </div>
    </div>
  );
}
