import { useMutation, useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { useUser } from "@clerk/nextjs";

export const useConvexSubmissionsFuncs = () => {
  const createSubmission = useMutation(api.submissions.createSubmission);
  const updateSubmission = useMutation(api.submissions.updateSubmission);
  const getSubmission = useQuery(api.submissions.getSubmission, "skip");
  const { user } = useUser();

  // Get challenge ID based on judge metadata
  const getChallengeIdForJudge = () => {
    if (!user?.publicMetadata?.judge) return undefined;
    
    const judgeType = user.publicMetadata.judge as string;
    
    // Static judges get all submissions (no filter)
    if (judgeType === "static") return undefined;
    
    // Map judge types to challenge IDs
    const challengeMap: Record<string, number> = {
      "chall-1": 1,
      "chall-2": 2, 
      "chall-3": 3,
    };
    
    return challengeMap[judgeType];
  };

  const getSubmissionsForJudge = useQuery(
    api.submissions.getSubmissionsForJudge,
    user ? { challengeId: getChallengeIdForJudge() } : "skip"
  );

  return {
    createSubmission,
    updateSubmission,
    getSubmission,
    getSubmissionsForJudge,
  };
};
