import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    id: v.string(),
    teamId: v.optional(v.id("teams")),
    verified: v.boolean(),
  }),

  teams: defineTable({
    name: v.string(),
    creatorId: v.id("users"),
    confirmed: v.boolean(),
    teamCode: v.string(),
    challengeId: v.number(), // we wont store challenges in DB, but the IDs are in consts.ts
    members: v.array(v.id("users")),
  }),

  submissions: defineTable({
    id: v.string(),
    teamId: v.id("teams"),
    challengeId: v.number(),
    judgements: v.array(v.id("judgements")),
    finalScore: v.number(), // will be summed from individual judgement scores
  }),

  judgements: defineTable({
    id: v.string(),
    submissionId: v.id("submissions"),
    score: v.number(),
  }),
});
