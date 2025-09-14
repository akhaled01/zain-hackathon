import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { ConvexResponse, createSuccessResponse, createErrorResponse, ErrorCodes } from "./types";

export const createUser = mutation({
  args: { 
    clerkId: v.string(),
  },
  handler: async (ctx, args): Promise<ConvexResponse> => {
    try {
      // Check if user already exists
      const existingUser = await ctx.db
        .query("users")
        .filter((q) => q.eq(q.field("id"), args.clerkId))
        .first();
      
      if (existingUser) {
        return createSuccessResponse({ userId: existingUser._id, existing: true });
      }

      // Create new user
      const userId = await ctx.db.insert("users", {
        id: args.clerkId,
        teamId: undefined as any, // Will be set when user joins/creates a team
        verified: false,
      });

      return createSuccessResponse({ userId, existing: false });
    } catch (error) {
      return createErrorResponse("Failed to create user", ErrorCodes.INTERNAL_ERROR);
    }
  },
});

export const verifyUser = mutation({
  args: { userId: v.id("users") },
  handler: async (ctx, args): Promise<ConvexResponse> => {
    try {
      const user = await ctx.db.get(args.userId);
      if (!user) {
        return createErrorResponse("User not found", ErrorCodes.NOT_FOUND);
      }
      
      if (user.verified) {
        return createErrorResponse("User is already verified", ErrorCodes.ALREADY_EXISTS);
      }
      
      await ctx.db.patch(args.userId, { verified: true });
      return createSuccessResponse({ message: "User verified successfully" });
    } catch (error) {
      return createErrorResponse("Failed to verify user", ErrorCodes.INTERNAL_ERROR);
    }
  },
});

export const getUserByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args): Promise<ConvexResponse> => {
    try {
      const user = await ctx.db
        .query("users")
        .filter((q) => q.eq(q.field("id"), args.clerkId))
        .first();
        
      if (!user) {
        return createErrorResponse("User not found", ErrorCodes.NOT_FOUND);
      }
      
      return createSuccessResponse(user);
    } catch (error) {
      return createErrorResponse("Failed to fetch user", ErrorCodes.INTERNAL_ERROR);
    }
  },
});
