import React from "react";

export default function AboutStorySection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
        {/* Left: Text Content */}
        <div className="flex-1">
          <h2 className="text-3xl sm:text-4xl font-bolder text-gray-900 mb-6">
            Our Story: Pioneering Coworking Excellence
          </h2>
          <div className="text-gray-600 leading-relaxed text-base space-y-4">
            <p>
              Alfa Busines Center has consistently moved toward private office space and virtual office space markets from a one of a kind, innovative viewpoint. Our assurance to offer sole owners and private companies genuine business arrangements has turned the possibility of costly official workplaces and indifferent virtual office and cooperating spaces on its head.
            </p>
            <p>
              We comprehend what cooperating implies. That is the 21st century office culture. Make proper acquaintance with the contemporary idea of office culture, make proper acquaintance with WEWORK!
            </p>
          </div>
        </div>

        {/* Right: Video Thumbnail */}
        <div className="flex-1">
          <div className="rounded-xl overflow-hidden shadow-sm">
            <video
              src="/cowroking.mp4"
              width={640}
              height={400}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-auto object-cover rounded-xl"
              poster="/about-video-thumbnail.png" // optional poster
            />
          </div>
        </div>
      </div>
    </section>
  );
}
