import {
  RocketIcon,
  BuildingIcon,
  MedalIcon,
  HeartIcon,
  LaptopIcon,
} from "lucide-react";

const timelineData = [
  {
    year: "2020",
    title: "Founded Alfa Business Center",
    description:
      "Established with a vision to revolutionize shared workspaces in Mumbai, focusing on community and innovation.",
    icon: <RocketIcon className="h-5 w-5 text-[rgb(45,56,106)]" />,
  },
  {
    year: "2021",
    title: "Expansion of Core Facilities",
    description:
      "Launched new private offices and state-of-the-art meeting rooms, enhancing our service offerings.",
    icon: <BuildingIcon className="h-5 w-5 text-[rgb(45,56,106)]" />,
  },
  {
    year: "2022",
    title: "Achieved High Occupancy",
    description:
      "Reached full occupancy with a diverse portfolio of startups and established businesses.",
    icon: <MedalIcon className="h-5 w-5 text-[rgb(45,56,106)]" />,
  },
  {
    year: "2023",
    title: "Introduced Wellness Programs",
    description:
      "Initiated a series of wellness workshops and events to support our members’ holistic well-being.",
    icon: <HeartIcon className="h-5 w-5 text-[rgb(45,56,106)]" />,
  },
  {
    year: "2024",
    title: "Launched Digital Membership",
    description:
      "Introduced flexible virtual office and digital membership options to cater to remote teams.",
    icon: <LaptopIcon className="h-5 w-5 text-[rgb(45,56,106)]" />,
  },
];

export default function OurJourneySection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-16">
          Our Journey
        </h2>

        {/* Desktop View */}
        <div className="hidden md:grid relative grid-cols-9 gap-4">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[rgb(45,56,106)] z-0" />

          {timelineData.map((item, index) => (
            <div key={index} className="contents">
              {/* Left content */}
              <div
                className={`col-span-4 ${index % 2 === 0 ? "flex justify-end" : ""}`}
              >
                {index % 2 === 0 && (
                  <div className="bg-gray-100 p-6 rounded-xl shadow-sm max-w-md w-full text-right">
                    <p className="text-[rgb(45,56,106)] text-sm font-semibold">{item.year}</p>
                    <h3 className="text-lg font-bold text-gray-900 mt-1 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                  </div>
                )}
              </div>

              {/* Icon */}
              <div className="col-span-1 flex items-center justify-center z-10 relative">
                <div className="w-10 h-10 rounded-full bg-white border-2 border-[rgb(45,56,106)] shadow flex items-center justify-center">
                  {item.icon}
                </div>
              </div>

              {/* Right content */}
              <div
                className={`col-span-4 ${index % 2 !== 0 ? "flex justify-start" : ""}`}
              >
                {index % 2 !== 0 && (
                  <div className="bg-gray-100 p-6 rounded-xl shadow-sm max-w-md w-full text-left">
                    <p className="text-[rgb(45,56,106)] text-sm font-semibold">{item.year}</p>
                    <h3 className="text-lg font-bold text-gray-900 mt-1 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View */}
        <div className="md:hidden space-y-10">
          {timelineData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center bg-gray-100 p-6 rounded-xl shadow-sm"
            >
              <div className="w-10 h-10 mb-4 rounded-full bg-white border-2 border-[rgb(45,56,106)] shadow flex items-center justify-center">
                {item.icon}
              </div>
              <p className="text-[rgb(45,56,106)] text-sm font-semibold">{item.year}</p>
              <h3 className="text-lg font-bold text-gray-900 mt-1 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
