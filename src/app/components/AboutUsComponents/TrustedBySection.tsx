import Image from "next/image";

const trustedLogos = [
  "clogo1.jpg", "clogo2.png", "clogo3.webp",
  "clogo1.jpg", "clogo2.png", "clogo3.webp",
  "clogo1.jpg", "clogo2.png", "clogo3.webp",
];

export default function TrustedBySection() {
  const repeated = [...trustedLogos, ...trustedLogos]; // for marquee effect

  return (
    <section className="py-16 bg-white px-4 sm:px-6 lg:px-10 relative">
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-10">
          <h2 className="text-gray-600 text-lg font-semibold">
            Trusted by Leading Companies
          </h2>
        </div>

        {/* Fade Sides */}
        <div className="absolute top-0 left-0 w-16 h-full z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
        <div className="absolute top-0 right-0 w-16 h-full z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />

        <div className="space-y-6">
          {/* Row 1: Infinite Scroll Marquee */}
          <div className="overflow-hidden">
            <div className="flex w-max gap-10 animate-marquee">
              {repeated.map((logo, index) => (
                <div key={`row1-${index}`} className="w-28 md:w-32 lg:w-36 shrink-0">
                  <Image
                    src={`/${logo}`}
                    alt={`Logo ${index + 1}`}
                    width={150}
                    height={60}
                    className="w-full h-auto object-contain grayscale hover:grayscale-0 transition duration-300"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Center-aligned, auto-scrollable on mobile */}
          <div className="overflow-x-auto sm:overflow-hidden">
            <div className="flex flex-nowrap justify-center gap-10 sm:justify-center sm:overflow-hidden min-w-full">
              {trustedLogos.map((logo, index) => (
                <div key={`row2-${index}`} className="w-28 md:w-32 lg:w-36 shrink-0">
                  <Image
                    src={`/${logo}`}
                    alt={`Static Logo ${index + 1}`}
                    width={150}
                    height={60}
                    className="w-full h-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
