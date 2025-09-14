import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { ConvexResponse, createSuccessResponse, createErrorResponse, ErrorCodes } from "./types";

export const createSubmission = mutation({
  args: {
    teamId: v.id("teams"),
    challengeId: v.number(),
  },
  handler: async (ctx, args): Promise<ConvexResponse> => {
    try {
      // Check if team exists
      const team = await ctx.db.get(args.teamId);
      if (!team) {
        return createErrorResponse("Team not found", ErrorCodes.NOT_FOUND);
      }
      
      // Check if team already has a submission for this challenge
      const existingSubmission = await ctx.db
        .query("submissions")
        .filter((q) => q.and(
          q.eq(q.field("teamId"), args.teamId),
          q.eq(q.field("challengeId"), args.challengeId)
        ))
        .first();
        
      if (existingSubmission) {
        return createErrorResponse("Team has already submitted for this challenge", ErrorCodes.ALREADY_SUBMITTED);
      }
      
      const submissionId = await ctx.db.insert("submissions", {
        id: crypto.randomUUID(),
        teamId: args.teamId,
        challengeId: args.challengeId,
        judgements: [],
        finalScore: 0,
      });
      
      return createSuccessResponse({ submissionId });
    } catch (error) {
      return createErrorResponse("Failed to create submission", ErrorCodes.INTERNAL_ERROR);
    }
  },
});
    
export const getSubmission = query({
  args: {
    submissionId: v.id("submissions"),
  },
  handler: async (ctx, args): Promise<ConvexResponse> => {
    try {
      const submission = await ctx.db.get(args.submissionId);
      if (!submission) {
        return createErrorResponse("Submission not found", ErrorCodes.NOT_FOUND);
      }
      return createSuccessResponse(submission);
    } catch (error) {
      return createErrorResponse("Failed to fetch submission", ErrorCodes.INTERNAL_ERROR);
    }
  },
});

export const updateSubmission = mutation({
  args: {
    submissionId: v.id("submissions"),
    judgements: v.array(v.id("judgements")),
  },
  handler: async (ctx, args): Promise<ConvexResponse> => {
    try {
      const submission = await ctx.db.get(args.submissionId);
      if (!submission) {
        return createErrorResponse("Submission not found", ErrorCodes.NOT_FOUND);
      }
      
      await ctx.db.patch(args.submissionId, { judgements: args.judgements });
      return createSuccessResponse({ message: "Submission updated successfully" });
    } catch (error) {
      return createErrorResponse("Failed to update submission", ErrorCodes.INTERNAL_ERROR);
    }
  },
});
