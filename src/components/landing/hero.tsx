import { Button } from "@/components/ui/button";
import { CountdownTimer } from "@/components/landing/countdown";
import { useRouter } from "next/navigation";
import { useTimer } from "@/lib/hooks/utils/timer";

export const HeroSection = ({
  timeLeft,
}: {
  timeLeft: { days: number; hours: number; minutes: number; seconds: number };
}) => {
  const router = useRouter();
  const { isStarted } = useTimer();

  return (
    <section className="min-h-screen flex items-center justify-center px-6 lg:px-8 bg-transparent">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left Column: Logo, Title, and CTA */}
          <div className="space-y-10 text-center lg:text-left">
            {/* Logo */}
            <div className="flex justify-center lg:justify-start">
              <img
                src="/zain-logo.png"
                alt="Zain Logo"
                className="h-20 w-auto object-contain"
                onError={(e) => {
                  // Fallback if logo doesn't exist
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>

            {/* Hackathon Title */}
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight bg-gradient-to-r from-primary via-secondary to-primary/80 bg-clip-text text-transparent animate-gradient-x mb-4">
                Zain AI Hackathon
              </h1>
              {/* <p className="text-lg md:text-xl text-muted-foreground mt-6 max-w-2xl">
                Join the ultimate AI innovation challenge. Build, compete, and shape the future of technology.
              </p> */}
            </div>
          </div>

          {/* Right Column: Countdown Timer */}
          <div className="flex flex-col items-center lg:items-end space-y-8">
            {/* Countdown Timer */}
            <div className="w-full max-w-lg">
              {isStarted ? (
                <div className="text-center space-y-6 p-8 bg-background/80 backdrop-blur-md rounded-2xl border border-border/50 shadow-2xl">
                  <div className="text-3xl font-bold text-primary">
                    Hackathon Started!
                  </div>
                  <p className="text-lg text-muted-foreground">
                    The competition is now live.
                  </p>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg px-8 py-6 border-primary text-primary hover:bg-primary/10 mt-4"
                    onClick={() => router.push("/dashboard/challs")}
                  >
                    View Challenges
                  </Button>
                </div>
              ) : (
                <div className="bg-background/80 backdrop-blur-md rounded-2xl p-6 border border-border/50 shadow-2xl">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-foreground mb-2">Competition Starts In</h3>
                    <p className="text-muted-foreground">Get ready to innovate</p>
                  </div>
                  <CountdownTimer timeLeft={timeLeft} />
                  <div className="flex justify-center mt-6">
                    <Button
                      size="lg"
                      variant="outline"
                      className="text-lg px-8 py-6 border-primary text-primary hover:bg-primary/10"
                      onClick={() => router.push("/dashboard/challs")}
                    >
                      See Challenges
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
