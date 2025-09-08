import AboutStorySection from "@/app/components/AboutUsComponents/AboutStorySection";
import OurMissionSection from "../components/AboutUsComponents/OurMissionSection";
import WhyChooseSection from "../components/landing/WhyChooseSection";
import OurJourneySection from "../components/AboutUsComponents/OurJourneySection";
import TrustedBySection from "../components/AboutUsComponents/TrustedBySection";


export default function AboutPage() {
  return (
    <main className="bg-white">
      <AboutStorySection />
      <OurMissionSection />
      <WhyChooseSection
        heading="What Sets Us Apart?"
        subheading="We’re more than a workspace — we’re your productivity partner."
        maxVisible={8}
      />
      <OurJourneySection />
      <TrustedBySection />
    </main>
  );
}
