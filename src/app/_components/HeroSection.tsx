import React from "react";
import Image from "next/image";

type HeroSectionProps = {
  onRegisterClick: () => void;
};

function HeroSection({ onRegisterClick }: HeroSectionProps) {
  const currentYear = new Date().getFullYear();

  return (
    <section
      id="hero-section"
      className="relative w-full h-screen flex items-center justify-center"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/concert.jpg"
          layout="fill"
          objectFit="cover"
          alt="Picture of a concert"
          priority={true}
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 text-center text-white px-6 max-w-3xl">
        <h1 className="text-6xl font-extrabold mb-6 drop-shadow-lg">
          {currentYear}{" "}
          <span className="text-yellow-400 animate-pulse">OPEN HEAVENS</span>
        </h1>

        {/* Event Details */}
        <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 text-black p-8 rounded-xl shadow-2xl backdrop-blur-lg bg-opacity-95 border-4 border-yellow-500">
          <h2 className="text-3xl font-bold mb-4 uppercase tracking-wide text-center">
            🔥 Event Details 🔥
          </h2>
          <p className="text-lg font-medium">
            📅 <span className="font-bold">Date:</span> December 15, {currentYear}
          </p>
          <p className="text-lg font-medium">
            📍 <span className="font-bold">Location:</span> Grand Arena, New
            York
          </p>
          <p className="text-lg font-medium">
            ⏰ <span className="font-bold">Time:</span> 6:00 PM - 11:00 PM
          </p>
          <p className="text-lg font-medium">
            🚪 <span className="font-bold">Doors Open:</span> 5:00 PM
          </p>
          <p className="text-lg font-medium">
            🚌 <span className="font-bold">Free Transportation Available</span>
          </p>

          {/* Register Button */}
          <button
            onClick={onRegisterClick}
            className="mt-6 bg-black text-yellow-400 border-2 border-yellow-500 hover:bg-yellow-500 hover:text-black font-extrabold py-3 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Register Now
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
