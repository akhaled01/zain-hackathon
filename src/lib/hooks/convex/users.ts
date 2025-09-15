import { api } from "@convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { ConvexResponse } from "@convex/types";
import { Id } from "@convex/_generated/dataModel";

export const useUserConvexFuncs = () => {
  const { user } = useUser();

  const createUserMutation = useMutation(api.user.createUser);
  const verifyUserMutation = useMutation(api.user.verifyUser);
  const getUserByClerkId = useQuery(
    api.user.getUserByClerkId,
    user?.id ? { clerkId: user.id } : "skip"
  );

  const createUser = async (args: { clerkId: string, name: string, email: string, username: string }) => {
    try {
      const result = await createUserMutation(args) as ConvexResponse;
      if (result.success) {
        if (result.data.existing) {
          toast.info("Welcome back!");
        } else {
          toast.success("Account created successfully!");
        }
        return result;
      } else {
        toast.error(result.error);
        return result;
      }
    } catch (error) {
      toast.error("Failed to create user account");
      throw error;
    }
  };

  const verifyUser = async (args: { userId: Id<"users"> }) => {
    try {
      const result = await verifyUserMutation(args) as ConvexResponse;
      if (result.success) {
        toast.success("Account verified successfully!");
        return result;
      } else {
        toast.error(result.error);
        return result;
      }
    } catch (error) {
      toast.error("Failed to verify user account");
      throw error;
    }
  };

  const getUserById = (userId: Id<"users"> | undefined) => 
    useQuery(
      api.user.getUserById,
      userId ? { userId } : "skip"
    );

  return { createUser, verifyUser, getUserByClerkId, getUserById };
};
