import { Hero } from "@/components/hero";
import { StatsBar } from "@/components/stats-bar";

export default function Home() {
  return (
    <div className="w-full flex flex-col">
      {/* Hero Section */}
      <Hero />
      {/* Stats and Trust Bar */}
      <StatsBar />
    </div>
  );
}

