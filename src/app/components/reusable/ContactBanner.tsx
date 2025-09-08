export default function ContactBanner() {
  return (
    <div className="relative bg-gradient-to-b from-yellow-300 to-yellow-100 pb-24 overflow-hidden">
      {/* Fog Effect at Top */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent z-10" />

      {/* Heading & Subtext */}
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-30 text-center px-4 w-full max-w-5xl">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900">
          Get in Touch with <span className="text-black">Alfa Business Center</span>
        </h1>
        {/* <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-600 max-w-xl mx-auto">
          We’re here to answer your questions and help you find the perfect workspace solution in Mumbai. Reach out to us!
        </p> */}
      </div>

      {/* Wavy SVG Shape */}
      <div className="absolute inset-0 z-20 overflow-hidden">
        <svg
          className="absolute top-0 w-full h-32"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#facc15"
            d="M0,64L80,69.3C160,75,320,85,480,117.3C640,149,800,203,960,202.7C1120,203,1280,149,1360,122.7L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          />
        </svg>
      </div>

      {/* Fog Effect at Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent z-10" />
    </div>
  );
}
