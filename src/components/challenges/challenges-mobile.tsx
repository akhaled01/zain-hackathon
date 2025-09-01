"use client";

import { useState } from "react";
import { challenges } from "@/lib/consts";
import { Challenge } from "@/lib/types";
import { ChallengeDetailsDialog } from "./challenge-details-dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy } from "lucide-react";

// Mobile Challenge Card Component
const MobileChallengeCard = ({
  challenge,
  onChallengeClick,
}: {
  challenge: Challenge;
  onChallengeClick: (challenge: Challenge) => void;
}) => {
  const IconComponent = challenge.icon;

  return (
    <Card
      className="relative overflow-hidden transition-all duration-300 cursor-pointer group border-border/60 bg-gradient-to-br from-background to-muted/20 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 hover:bg-gradient-to-br hover:from-primary/5 hover:to-background"
      onClick={() => onChallengeClick(challenge)}
    >

      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/20 to-transparent rounded-full transform translate-x-16 -translate-y-16" />
      </div>

      <CardContent className="p-5 relative">
        <div className="flex items-start gap-4">
          {/* Challenge Icon */}
          <div className="p-3 rounded-xl transition-all duration-300 group-hover:scale-105 bg-primary/15 group-hover:bg-primary/20 shadow-md shadow-primary/5">
            <IconComponent className="h-7 w-7 transition-colors duration-300 text-primary group-hover:text-primary" />
          </div>

          {/* Challenge Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-3">
              <Badge
                variant="secondary"
                className="text-xs font-medium px-2.5 py-1 bg-muted/80 text-muted-foreground border-muted-foreground/20"
              >
                {challenge.category}
              </Badge>
            </div>

            <h3
              className="font-bold text-base mb-2 transition-colors duration-300 text-foreground group-hover:text-primary"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}
            >
              {challenge.title}
            </h3>

            <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
              {challenge.description}
            </p>

            <Button
              size="sm"
              variant="outline"
              className="w-full text-sm h-9 font-medium transition-all duration-300 border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50"
              onClick={(e) => {
                e.stopPropagation();
                onChallengeClick(challenge);
              }}
            >
              Learn More
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Team Status Header Component - UI mockup only
const TeamStatusHeader = () => {
  return (
    <div className="bg-gradient-to-r from-primary/15 to-secondary/15 rounded-2xl p-5 mb-6 border border-primary/30 shadow-lg shadow-primary/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/20 to-transparent rounded-full transform translate-x-12 -translate-y-12" />

      <div className="flex items-center gap-4 relative">
        <div className="p-3 bg-primary/25 rounded-xl shadow-md">
          <Trophy className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="font-bold text-base text-foreground mb-1">
            Zain AI Challenges
          </h3>
          <p className="text-sm text-muted-foreground">
            Choose your challenge and build the future
          </p>
        </div>
      </div>
    </div>
  );
};

export const ChallengesMobile = () => {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(
    null
  );

  // Handle challenge card clicks
  const handleChallengeClick = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <div className="mb-6">
        <h1
          className="text-2xl font-bold text-foreground mb-2"
          style={{ fontFamily: '"IBM Plex Mono", monospace' }}
        >
          Zain AI Challenges
        </h1>
        <p className="text-sm text-muted-foreground">
          Transform ideas into intelligent solutions
        </p>
      </div>

      {/* Team Status */}
      <TeamStatusHeader />

      {/* Challenges Grid */}
      <div className="space-y-5">
        {challenges.map((challenge) => (
          <MobileChallengeCard
            key={challenge.id}
            challenge={challenge}
            onChallengeClick={handleChallengeClick}
          />
        ))}
      </div>

      {/* Challenge Details Dialog */}
      <ChallengeDetailsDialog
        selectedChallenge={selectedChallenge}
        onClose={() => setSelectedChallenge(null)}
      />
    </div>
  );
};
