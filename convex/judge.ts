import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import {
  ConvexResponse,
  createSuccessResponse,
  createErrorResponse,
  ErrorCodes,
} from "./types";


export const createJudgement = mutation({
  args: {
    submissionId: v.id("submissions"),
    judgeName: v.string(),
    score: v.number(),
  },
  handler: async (ctx, args): Promise<ConvexResponse> => {
    try {
      const submission = await ctx.db.get(args.submissionId);
      if (!submission) {
        return createErrorResponse("Submission not found", ErrorCodes.NOT_FOUND);
      }
      
      await ctx.db.insert("judgements", {
        id: crypto.randomUUID(),
        judgeName: args.judgeName,
        submissionId: args.submissionId,
        score: args.score,
      });
      
      return createSuccessResponse({ message: "Judgement created successfully" });
    } catch (error) {
      return createErrorResponse("Failed to create judgement", ErrorCodes.INTERNAL_ERROR);
    }
  },
})

export const updateJudgement = mutation({
  args: {
    judgementId: v.id("judgements"),
    score: v.number(),
  },
  handler: async (ctx, args): Promise<ConvexResponse> => {
    try {
      const judgement = await ctx.db.get(args.judgementId);
      if (!judgement) {
        return createErrorResponse("Judgement not found", ErrorCodes.NOT_FOUND);
      }
      
      await ctx.db.patch(args.judgementId, { score: args.score });
      return createSuccessResponse({ message: "Judgement updated successfully" });
    } catch (error) {
      return createErrorResponse("Failed to update judgement", ErrorCodes.INTERNAL_ERROR);
    }
  },
})