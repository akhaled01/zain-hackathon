import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { ConvexResponse, createSuccessResponse, createErrorResponse, ErrorCodes } from "./types";

const genRandomCode = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const code = Array.from(
    { length: 6 },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
  return `${code.slice(0, 3)}-${code.slice(3)}`;
};

export const getTeam = query({
  args: {
    teamId: v.id("teams"),
  },
  handler: async (ctx, args): Promise<ConvexResponse> => {
    try {
      const team = await ctx.db.query("teams").filter((q) => q.eq(q.field("_id"), args.teamId)).first();
      if (!team) {
        return createErrorResponse("Team not found", ErrorCodes.NOT_FOUND);
      }
      return createSuccessResponse(team);
    } catch (error) {
      return createErrorResponse("Failed to fetch team", ErrorCodes.INTERNAL_ERROR);
    }
  },
});

export const createTeam = mutation({
  args: {
    name: v.string(),
    challengeId: v.number(),
    creatorId: v.id("users"),
  },
  handler: async (ctx, args): Promise<ConvexResponse> => {
    try {
      // Check if user already has a team
      const existingUser = await ctx.db.get(args.creatorId);
      if (existingUser?.teamId) {
        return createErrorResponse("User already belongs to a team", ErrorCodes.ALREADY_EXISTS);
      }

      const code = genRandomCode();
      const teamId = await ctx.db.insert("teams", {
        name: args.name,
        creatorId: args.creatorId,
        confirmed: false,
        teamCode: code,
        challengeId: args.challengeId,
        members: [args.creatorId],
      });
      
      // Update user's teamId
      await ctx.db.patch(args.creatorId, { teamId });
      
      return createSuccessResponse({ teamId, teamCode: code });
    } catch (error) {
      return createErrorResponse("Failed to create team", ErrorCodes.INTERNAL_ERROR);
    }
  },
});

export const joinTeam = mutation({
  args: {
    teamCode: v.string(),
    userId: v.id("users"),
  },
  handler: async (ctx, args): Promise<ConvexResponse> => {
    try {
      const team = await ctx.db.query("teams").filter((q) => q.eq(q.field("teamCode"), args.teamCode)).first();
      if (!team) {
        return createErrorResponse("Team not found", ErrorCodes.NOT_FOUND);
      }
      
      // Check if user already belongs to a team
      const user = await ctx.db.get(args.userId);
      if (user?.teamId) {
        return createErrorResponse("User already belongs to a team", ErrorCodes.ALREADY_EXISTS);
      }
      
      // Check if user is already a member
      if (team.members.includes(args.userId)) {
        return createErrorResponse("User is already a member of this team", ErrorCodes.ALREADY_EXISTS);
      }
      
      await ctx.db.patch(team._id, { members: team.members.concat(args.userId) });
      await ctx.db.patch(args.userId, { teamId: team._id });
      
      return createSuccessResponse({ teamId: team._id });
    } catch (error) {
      return createErrorResponse("Failed to join team", ErrorCodes.INTERNAL_ERROR);
    }
  },
});

export const leaveTeam = mutation({
  args: {
    teamId: v.id("teams"),
    userId: v.id("users"),
  },
  handler: async (ctx, args): Promise<ConvexResponse> => {
    try {
      const team = await ctx.db.query("teams").filter((q) => q.eq(q.field("_id"), args.teamId)).first();
      if (!team) {
        return createErrorResponse("Team not found", ErrorCodes.NOT_FOUND);
      }
      
      // Check if user is a member of the team
      if (!team.members.includes(args.userId)) {
        return createErrorResponse("User is not a member of this team", ErrorCodes.NOT_FOUND);
      }
      
      await ctx.db.patch(team._id, { members: team.members.filter((id) => id !== args.userId) });
      await ctx.db.patch(args.userId, { teamId: undefined });
      
      return createSuccessResponse({ message: "Successfully left team" });
    } catch (error) {
      return createErrorResponse("Failed to leave team", ErrorCodes.INTERNAL_ERROR);
    }
  },
});

export const removeMember = mutation({
  args: {
    teamId: v.id("teams"),
    userId: v.id("users"),
    creatorId: v.id("users"),
  },
  handler: async (ctx, args): Promise<ConvexResponse> => {
    try {
      const team = await ctx.db.query("teams").filter((q) => q.eq(q.field("_id"), args.teamId)).first();
      if (!team) {
        return createErrorResponse("Team not found", ErrorCodes.NOT_FOUND);
      }
      
      if (team.creatorId !== args.creatorId) {
        return createErrorResponse("Only team creator can remove members", ErrorCodes.UNAUTHORIZED);
      }
      
      // Check if user is a member of the team
      if (!team.members.includes(args.userId)) {
        return createErrorResponse("User is not a member of this team", ErrorCodes.NOT_FOUND);
      }
      
      await ctx.db.patch(team._id, { members: team.members.filter((id) => id !== args.userId) });
      await ctx.db.patch(args.userId, { teamId: undefined });
      
      return createSuccessResponse({ message: "Member removed successfully" });
    } catch (error) {
      return createErrorResponse("Failed to remove member", ErrorCodes.INTERNAL_ERROR);
    }
  },
});

export const confirmTeam = mutation({
  args: {
    teamId: v.id("teams"),
  },
  handler: async (ctx, args): Promise<ConvexResponse> => {
    try {
      const team = await ctx.db.get(args.teamId);
      if (!team) {
        return createErrorResponse("Team not found", ErrorCodes.NOT_FOUND);
      }
      
      await ctx.db.patch(args.teamId, { confirmed: true });
      return createSuccessResponse({ message: "Team confirmed successfully" });
    } catch (error) {
      return createErrorResponse("Failed to confirm team", ErrorCodes.INTERNAL_ERROR);
    }
  },
});