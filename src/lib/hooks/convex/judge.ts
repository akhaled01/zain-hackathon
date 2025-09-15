import { api } from "@convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { toast } from "sonner";
import { ConvexResponse } from "@convex/types";
import { Id } from "@convex/_generated/dataModel";

export const useConvexJudgeFuncs = () => {
  const getSubmissionsForJudgeQuery = useQuery(api.submissions.getSubmissionsForJudge, "skip");
  const aggregateFinalScoreMutation = useMutation(api.submissions.aggregateFinalScore);
  const createJudgementMutation = useMutation(api.judge.createJudgement);

  const aggregateFinalScore = async (args: { submissionId: Id<"submissions"> }) => {
    try {
      const result = (await aggregateFinalScoreMutation(args)) as ConvexResponse;
      if (result.success) {
        toast.success("Final score calculated successfully!");
        return result;
      } else {
        toast.error(result.error);
        return result;
      }
    } catch (error) {
      toast.error("Failed to calculate final score");
      throw error;
    }
  };

  const createJudgement = async (args: {
    submissionId: Id<"submissions">;
    judgeName: string;
    score: number;
  }) => {
    try {
      const result = (await createJudgementMutation(args)) as ConvexResponse;
      if (result.success) {
        toast.success("Judgement submitted successfully!");
        return result;
      } else {
        toast.error(result.error);
        return result;
      }
    } catch (error) {
      toast.error("Failed to submit judgement");
      throw error;
    }
  };

  return {
    getSubmissionsForJudge: getSubmissionsForJudgeQuery,
    aggregateFinalScore,
    createJudgement,
  };
};
