import { useMutation, useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import { toast } from "sonner";
import { ConvexResponse } from "@convex/types";
import { useRouter } from "next/navigation";

export const useConvexTeamFuncs = (
  teamId?: Id<"teams">,
  userId?: Id<"users">
) => {
  const createTeamMutation = useMutation(api.teams.createTeam);
  const confirmTeamMutation = useMutation(api.teams.confirmTeam);
  const joinTeamMutation = useMutation(api.teams.joinTeam);
  const leaveTeamMutation = useMutation(api.teams.leaveTeam);
  const removeMemberMutation = useMutation(api.teams.removeMember);

  const getTeam = useQuery(api.teams.getTeam, teamId ? { teamId } : "skip");
  const getTeamByUser = useQuery(
    api.teams.getTeamByUser,
    userId ? { userId } : "skip"
  );

  const router = useRouter();

  const createTeam = async (args: {
    name: string;
    challengeId: number;
    creatorId: Id<"users">;
  }) => {
    try {
      const result = (await createTeamMutation(args)) as ConvexResponse;
      if (result.success) {
        toast.success("Team created successfully!");
        router.replace("/dashboard/team");
        return result;
      } else {
        toast.error(result.error);
        return result;
      }
    } catch (error) {
      toast.error("Failed to create team");
      throw error;
    }
  };

  const confirmTeam = async (args: { teamId: Id<"teams"> }) => {
    try {
      const result = (await confirmTeamMutation(args)) as ConvexResponse;
      if (result.success) {
        toast.success("Team confirmed successfully!");
        return result;
      } else {
        toast.error(result.error);
        return result;
      }
    } catch (error) {
      toast.error("Failed to confirm team");
      throw error;
    }
  };

  const joinTeam = async (args: { teamCode: string; userId: Id<"users"> }) => {
    try {
      const result = (await joinTeamMutation(args)) as ConvexResponse;
      if (result.success) {
        toast.success("Successfully joined team!");
        router.replace("/dashboard/team");
        return result;
      } else {
        toast.error(result.error);
        return result;
      }
    } catch (error) {
      toast.error("Failed to join team");
      throw error;
    }
  };

  const leaveTeam = async (args: {
    teamId: Id<"teams">;
    userId: Id<"users">;
  }) => {
    try {
      const result = (await leaveTeamMutation(args)) as ConvexResponse;
      if (result.success) {
        toast.success("Successfully left team!");
        router.replace("/dashboard/challs");
        return result;
      } else {
        toast.error(result.error);
        return result;
      }
    } catch (error) {
      toast.error("Failed to leave team");
      throw error;
    }
  };

  const removeMember = async (args: {
    teamId: Id<"teams">;
    userId: Id<"users">;
    creatorId: Id<"users">;
  }) => {
    try {
      const result = (await removeMemberMutation(args)) as ConvexResponse;
      if (result.success) {
        toast.success("Member removed successfully!");
        return result;
      } else {
        toast.error(result.error);
        return result;
      }
    } catch (error) {
      toast.error("Failed to remove member");
      throw error;
    }
  };

  const isUserInTeam = () => {
    const userTeamResponse = getTeamByUser;
    return userTeamResponse?.success && userTeamResponse.data !== null;
  }

  return {
    createTeam,
    getTeam,
    getTeamByUser,
    confirmTeam,
    joinTeam,
    leaveTeam,
    removeMember,
    isUserInTeam,
  };
};
