"use client";

import { MagicCard } from "@/components/magicui/magic-card";

export const CountdownTimer = ({
  timeLeft,
}: {
  timeLeft: { days: number; hours: number; minutes: number; seconds: number };
}) => (
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
    {[
      { label: "Days", value: timeLeft.days },
      { label: "Hours", value: timeLeft.hours },
      { label: "Minutes", value: timeLeft.minutes },
      { label: "Seconds", value: timeLeft.seconds },
    ].map((item, index) => (
      <MagicCard key={index} className="bg-card/60 backdrop-blur-sm rounded-xl border border-border/30 hover:border-primary/30 transition-all duration-300">
        <div className="p-4 text-center">
          <div className="text-3xl sm:text-4xl font-bold text-foreground mb-1">
            {String(item.value).padStart(2, '0')}
          </div>
          <div className="text-sm text-muted-foreground font-medium">
            {item.label}
          </div>
        </div>
      </MagicCard>
    ))}
  </div>
);
