import { useEffect, useState } from "react";

const START_AT = new Date("2025-09-18T17:55:00");
const END_AT = new Date("2025-09-20T13:15:00");

export const useTimer = () => {
  const [timeLeft, setTimeLeft] = useState<number>(
    END_AT.getTime() - new Date().getTime()
  );

  useEffect(() => {
    const updateTimer = () => {
      setTimeLeft(END_AT.getTime() - new Date().getTime());
    };

    // Update immediately
    updateTimer();

    // Set up interval for continuous updates
    const timer = setInterval(updateTimer, 1000);

    // Cleanup function
    return () => clearInterval(timer);
  }, []); // Empty dependency array - runs once on mount

  const now = new Date();
  const isStarted = now >= START_AT;
  const isFinished = timeLeft <= 0;
  const isRunning = isStarted && !isFinished;

  // Convert milliseconds to days, hours, minutes, seconds
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  const timeLeftFormatted = {
    days: Math.max(0, days),
    hours: Math.max(0, hours),
    minutes: Math.max(0, minutes),
    seconds: Math.max(0, seconds),
  };

  return {
    timeLeft: timeLeftFormatted,
    timeLeftMs: timeLeft,
    isStarted,
    isFinished,
    isRunning,
  };
};
