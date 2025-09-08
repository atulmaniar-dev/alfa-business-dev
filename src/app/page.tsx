export const metadata = {
  title: 'Alfa Business Center – Best Coworking Space in Mumbai',
  description:
    'Welcome to Alfa Business Center – A premium coworking space in Mumbai for startups, freelancers, and enterprises.',
};

import HeroSection from "@/app/components/landing/HeroSection";
import WhyChooseSection from "@/app/components/landing/WhyChooseSection";
import ScheduleVisit from "./components/landing/ScheduleVisit";
import TestimonialsSection from "@/app/components/landing/TestimonialsSection";
import PricingSection from "@/app/components/landing/PricingSection";
import LimitedOfferBanner from "./components/landing/LTOBanner";


export default function HomePage() {
  return (
    <main className="flex flex-col gap-10">
      <HeroSection />
      <WhyChooseSection
        heading="Why Choose Alfa Business Center?"
        subheading="Alfa Business Center has consistently moved toward private office space and virtual office space markets from a one of a kind, innovative viewpoint."
        maxVisible={8}
      />
      <PricingSection />
      <TestimonialsSection />
      <LimitedOfferBanner />
      <ScheduleVisit />
    </main>
  );
}
