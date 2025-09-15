"use client";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Challenge } from "@/lib/types";
import { TechStackBadge } from "./tech-stack-badge";
import { TeamJoinSection } from "./team-join-section";

interface ChallengeDetailsDialogProps {
  selectedChallenge: Challenge | null;
  onClose: () => void;
}

export const ChallengeDetailsDialog = ({
  selectedChallenge,
  onClose,
}: ChallengeDetailsDialogProps) => (
  <Dialog open={!!selectedChallenge} onOpenChange={() => onClose()}>
    <DialogContent className="min-w-[55vw] sm:w-full max-w-6xl mx-auto max-h-[90vh] overflow-y-auto backdrop-blur-xl bg-background/95 border border-primary/20">
      {selectedChallenge && (
        <>
          <DialogHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
              <div className="p-3 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl">
                <selectedChallenge.icon className="h-8 w-8 text-primary" />
              </div>
              <div>
                <DialogTitle
                  className="text-xl sm:text-2xl font-bold"
                  style={{ fontFamily: '"IBM Plex Mono", monospace' }}
                >
                  {selectedChallenge.title}
                </DialogTitle>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <Badge variant="secondary">
                    {selectedChallenge.category}
                  </Badge>
                </div>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-8 mt-8">
            <TeamJoinSection challengeId={selectedChallenge.id}/>
            {/* Challenge Description */}
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-4 text-foreground">
                The Challenge
              </h4>
              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                {selectedChallenge.description}
              </p>
            </div>

            {/* Example Ideas */}
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-4 text-foreground">
                Example Ideas
              </h4>
              <ul className="space-y-4">
                {selectedChallenge.exampleIdeas.map((idea, index) => {
                  const colonIndex = idea.indexOf(':');
                  const title = colonIndex !== -1 ? idea.substring(0, colonIndex) : '';
                  const description = colonIndex !== -1 ? idea.substring(colonIndex + 1).trim() : idea;
                  
                  return (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-sm sm:text-base"
                    >
                      <span className="text-primary mt-1 text-lg">•</span>
                      <div className="flex-1">
                        {title && (
                          <span className="font-bold text-primary">{title}:</span>
                        )}
                        <span className="text-muted-foreground ml-1">{description}</span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Tools & Tech */}
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-4 text-foreground">
                Tools & Tech Stacks
              </h4>
              <div className="space-y-4">
                {Object.entries(selectedChallenge.toolsAndTech).map(([category, technologies], index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-primary">•</span>
                      <span className="font-bold text-primary text-sm sm:text-base">{category}:</span>
                    </div>
                    <div className="flex flex-wrap gap-2 ml-5">
                      {technologies.map((tech: string, techIndex: number) => (
                        <TechStackBadge 
                          key={techIndex} 
                          name={tech}
                          className="text-xs"
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Deliverables */}
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-4 text-foreground">
                Deliverables
              </h4>
              <ul className="space-y-3">
                {selectedChallenge.deliverables.map((deliverable, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-sm sm:text-base text-muted-foreground"
                  >
                    <span className="text-primary mt-1">•</span>
                    <span>{deliverable}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Data Note */}
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-4 text-foreground">
                Data
              </h4>
              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                {selectedChallenge.dataNote}
              </p>
            </div>
          </div>
        </>
      )}
    </DialogContent>
  </Dialog>
);
