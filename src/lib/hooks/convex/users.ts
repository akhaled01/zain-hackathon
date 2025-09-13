import { api } from "@convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";

export const useUserConvexFuncs = () => {
  const { user } = useUser();

  const createUser = useMutation(api.user.createUser);
  const verifyUser = useMutation(api.user.verifyUser);
  const getUserByClerkId = useQuery(
    api.user.getUserByClerkId,
    user?.id ? { clerkId: user.id } : "skip"
  );

  return { createUser, verifyUser, getUserByClerkId };
};
