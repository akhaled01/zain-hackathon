"use client";

import React, { useCallback } from "react";
import { useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { SubmissionsTable } from "./submissions-table";
import { Trophy } from "lucide-react";
import { toast } from "sonner";
import { useConvexSubmissionsFuncs } from "@/lib/hooks/convex/submissions";
import { CriteriaScores, SubmissionWithTeam } from "@/lib/types";
import { useUser } from "@clerk/nextjs";


export const JudgeDashboard: React.FC = () => {
  const { user } = useUser();
  const { getSubmissionsForJudge } = useConvexSubmissionsFuncs();
  const createJudgement = useMutation(api.judge.createJudgement);

  const submissions: SubmissionWithTeam[] = getSubmissionsForJudge?.success
    ? getSubmissionsForJudge.data
    : [];

  const isLoading = getSubmissionsForJudge === undefined;


  const handleSubmitScore = useCallback(
    async (
      submissionId: string,
      _scores: CriteriaScores,
      totalScore: number
    ) => {
      if (!user?.fullName) {
        toast.error("User information not available");
        return;
      }
      try {
        const result = await createJudgement({
          submissionId: submissionId as any,
          judgeName: user.fullName,
          score: totalScore,
        });

        if (result.success) {
          toast.success("Score submitted successfully!");
        } else {
          toast.error(result.error || "Failed to submit score");
        }
      } catch (error) {
        console.error("Error submitting score:", error);
        toast.error("Failed to submit score. Please try again.");
      }
    },
    [createJudgement, user]
  );

  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Trophy className="h-8 w-8 text-primary" />
            Judge Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Evaluate submissions for the Zain AI Hackathon
          </p>
        </div>
      </div>

      {/* Submissions Table */}
      <SubmissionsTable
        submissions={submissions}
        onSubmitScore={handleSubmitScore}
        isLoading={isLoading}
      />
    </div>
  );
};