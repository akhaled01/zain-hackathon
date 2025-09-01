"use client";

import { useTimer } from "@/lib/hooks/utils/timer";
import { HeroSection } from "@/components/landing/hero";
import { Particles } from "@/components/magicui/particles";

const Home = () => {
  const { timeLeft } = useTimer();
  return (
    <div className="min-h-screen bg-background relative">
      <Particles
        className="absolute inset-0"
        quantity={80}
        ease={80}
        color="#14b8a6"
        refresh={false}
      />
      <HeroSection timeLeft={timeLeft} />
    </div>
  );
};

export default Home;
