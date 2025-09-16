"use client";

import React, { useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Trophy,
  Target,
  Lightbulb,
  Cog,
  TrendingUp,
  Presentation,
  Award,
  Calculator,
} from "lucide-react";
import { judgingCriteria } from "@/lib/consts";
import { CustomBadge } from "@/components/global/custom-badge";
import { SubmissionWithTeam, CriteriaScores } from "@/lib/types";

interface ScoringDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  submission: SubmissionWithTeam | null;
  onSubmitScore?: (
    submissionId: string,
    scores: CriteriaScores,
    totalScore: number
  ) => Promise<void>;
  isSubmitting?: boolean;
}

const criteriaIcons = {
  1: Target, // Business Value & Corporate Impact
  2: Lightbulb, // Innovation & Creativity
  3: Cog, // Feasibility & Implementation
  4: TrendingUp, // Scalability & Long-Term Potential
  5: Presentation, // Presentation & Clarity
};

export function ScoringDialog({
  open,
  onOpenChange,
  submission,
  onSubmitScore,
  isSubmitting = false,
}: ScoringDialogProps) {
  const [scores, setScores] = useState<CriteriaScores>({});

  // Calculate total weighted score
  const calculateTotalScore = useCallback((currentScores: CriteriaScores) => {
    let totalWeightedScore = 0;
    let totalWeight = 0;

    judgingCriteria.criteria.forEach((criterion) => {
      const score = currentScores[criterion.id];
      if (score !== undefined) {
        totalWeightedScore += (score * criterion.weight) / 100;
        totalWeight += criterion.weight;
      }
    });


    return totalWeight > 0
      ? (totalWeightedScore * judgingCriteria.maxScore) / (totalWeight / 100)
      : 0;
  }, []);

  const handleScoreChange = (criteriaId: number, value: number[]) => {
    const newScores = { ...scores, [criteriaId]: value[0] };
    setScores(newScores);
  };

  const getScoreLabel = (score: number) => {
    if (score >= 9) return { label: "Excellent", variant: "success" as const };
    if (score >= 6) return { label: "Good", variant: "info" as const };
    if (score >= 3) return { label: "Fair", variant: "warning" as const };
    return { label: "Poor", variant: "default" as const };
  };

  const handleSubmit = async () => {
    if (!submission || !onSubmitScore) return;

    const totalScore = calculateTotalScore(scores);
    await onSubmitScore(submission._id, scores, totalScore);

    // Reset form
    setScores({});
    onOpenChange(false);
  };

  const isFormValid = () => {
    return judgingCriteria.criteria.every(
      (criterion) =>
        scores[criterion.id] !== undefined &&
        scores[criterion.id] >= 0 &&
        scores[criterion.id] <= 10
    );
  };

  const totalScore = calculateTotalScore(scores);

  if (!submission) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-[1200px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Score Submission: {submission.team?.name}
          </DialogTitle>
          <DialogDescription>
            Evaluate this submission based on the Zain AI Hackathon judging
            criteria. Challenge: {submission.challengeName}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-6">
            {/* Score Guide */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  Scoring Guide
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {Object.entries(judgingCriteria.scoreGuide).map(
                    ([key, guide]) => (
                      <div key={key} className="text-center">
                        <CustomBadge
                          variant={
                            key === "excellent"
                              ? "success"
                              : key === "good"
                              ? "info"
                              : key === "fair"
                              ? "warning"
                              : "default"
                          }
                          className="mb-1"
                        >
                          {guide.range}
                        </CustomBadge>
                        <p className="text-xs text-muted-foreground">
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Scoring Criteria */}
            <div className="space-y-4">
              {judgingCriteria.criteria.map((criterion) => {
                const Icon =
                  criteriaIcons[criterion.id as keyof typeof criteriaIcons];
                const currentScore = scores[criterion.id] || 0;
                const scoreLabel = getScoreLabel(currentScore);

                return (
                  <Card key={criterion.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon className="h-5 w-5" />
                          <span>{criterion.name}</span>
                          <CustomBadge variant="default">
                            {criterion.weight}%
                          </CustomBadge>
                        </div>
                        <div className="flex items-center gap-2">
                          <CustomBadge variant={scoreLabel.variant}>
                            {scoreLabel.label}
                          </CustomBadge>
                          <span className="font-mono text-lg font-bold">
                            {currentScore.toFixed(1)}/10
                          </span>
                        </div>
                      </CardTitle>
                      <DialogDescription>
                        {criterion.objective}
                      </DialogDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Slider */}
                      <div className="space-y-2">
                        <Label>Score (0-10)</Label>
                        <Slider
                          value={[currentScore]}
                          onValueChange={(value) =>
                            handleScoreChange(criterion.id, value)
                          }
                          max={10}
                          min={0}
                          step={0.1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>0 (Poor)</span>
                          <span>5 (Fair)</span>
                          <span>10 (Excellent)</span>
                        </div>
                      </div>

                      {/* Key Considerations */}
                      <div>
                        <Label className="text-sm font-medium">
                          Key Considerations:
                        </Label>
                        <ul className="mt-1 text-sm text-muted-foreground space-y-1">
                          {criterion.keyConsiderations.map(
                            (consideration, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-primary">•</span>
                                {consideration}
                              </li>
                            )
                          )}
                        </ul>
                      </div>

                      {/* Guiding Questions */}
                      <div>
                        <Label className="text-sm font-medium">
                          Guiding Questions:
                        </Label>
                        <ul className="mt-1 text-sm text-muted-foreground space-y-1">
                          {criterion.guidingQuestions.map((question, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-primary">?</span>
                              {question}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>



            {/* Total Score Summary */}
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Total Weighted Score
                  </div>
                  <div className="text-2xl font-bold text-primary">
                    {totalScore.toFixed(2)}/100
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  {judgingCriteria.criteria.map((criterion) => {
                    const score = scores[criterion.id] || 0;
                    const weightedScore = (score * criterion.weight) / 100;
                    return (
                      <div key={criterion.id} className="flex justify-between">
                        <span className="text-muted-foreground">
                          {criterion.name}:
                        </span>
                        <span className="font-medium">
                          {weightedScore.toFixed(2)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>

        <Separator />

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!isFormValid() || isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Score"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
