import { Hero } from "@/components/hero";
import { StatsBar } from "@/components/stats-bar";
import { ServicesSection } from "@/components/services-section";
import { WhyChooseUs } from "@/components/why-choose-us";
import { HowItWorks } from "@/components/how-it-works";
import { BeforeAfter } from "@/components/before-after";
import { GoogleReviews } from "@/components/google-reviews";
import { FAQ } from "@/components/faq";

export default function Home() {
  return (
    <div className="w-full flex flex-col">
      {/* Hero Section */}
      <Hero />
      {/* Stats and Trust Bar */}
      <StatsBar />
      {/* Services Section */}
      <ServicesSection />
      {/* Why Choose Us Section */}
      <WhyChooseUs />
      {/* How It Works Section */}
      <HowItWorks />
      {/* Before & After Section */}
      <BeforeAfter />
      {/* Google Reviews Section */}
      <GoogleReviews />
      {/* FAQ Section */}
      <FAQ />
    </div>
  );
}

