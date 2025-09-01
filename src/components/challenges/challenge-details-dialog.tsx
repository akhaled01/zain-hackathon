"use client";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Challenge } from "@/lib/types";

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
                  <Badge variant="outline">
                    {selectedChallenge.difficulty}
                  </Badge>
                </div>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-6 mt-6">
            {/* Challenge Description */}
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-3 text-foreground">
                The Challenge
              </h4>
              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                {selectedChallenge.description}
              </p>
            </div>

            {/* Example Ideas */}
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-3 text-foreground">
                Example Ideas
              </h4>
              <ul className="space-y-2">
                {selectedChallenge.exampleIdeas.map((idea, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm sm:text-base text-muted-foreground"
                  >
                    <span className="text-primary mt-1">•</span>
                    <span>{idea}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tools & Tech */}
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-3 text-foreground">
                Tools & Tech Stacks
              </h4>
              <ul className="space-y-2">
                {selectedChallenge.toolsAndTech.map((tool, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm sm:text-base text-muted-foreground"
                  >
                    <span className="text-primary mt-1">•</span>
                    <span>{tool}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Deliverables */}
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-3 text-foreground">
                Deliverables
              </h4>
              <ul className="space-y-2">
                {selectedChallenge.deliverables.map((deliverable, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm sm:text-base text-muted-foreground"
                  >
                    <span className="text-primary mt-1">•</span>
                    <span>{deliverable}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Data Note */}
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-3 text-foreground">
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
