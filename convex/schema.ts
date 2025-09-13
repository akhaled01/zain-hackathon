import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        id: v.string(),
        name: v.string(),
        teamId: v.id("teams"),
    }),

    teams: defineTable({
        name: v.string(),
        creatorId: v.id("users"),
        confirmed: v.boolean(),
        teamCode: v.string(),
        challenge: v.number(),
        members: v.array(v.id("users")),
    }),
})