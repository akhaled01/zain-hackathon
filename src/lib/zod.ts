import { z } from "zod";

// Zod validation schemas
const createTeamSchema = z.object({
  teamName: z.string()
    .min(1, "Team name is required")
    .min(2, "Team name must be at least 2 characters")
    .max(50, "Team name must be less than 50 characters")
    .regex(/^[a-zA-Z0-9\s\-_]+$/, "Team name can only contain letters, numbers, spaces, hyphens, and underscores")
});

const joinTeamSchema = z.object({
  teamCode: z.string()
    .length(6, "Team code must be exactly 6 characters")
    .regex(/^[A-Z0-9]{6}$/, "Team code must contain only uppercase letters and numbers")
});

type CreateTeamForm = z.infer<typeof createTeamSchema>;
type JoinTeamForm = z.infer<typeof joinTeamSchema>;

export { createTeamSchema, joinTeamSchema, type CreateTeamForm, type JoinTeamForm };
