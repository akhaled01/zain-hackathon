"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUserConvexFuncs } from "@/lib/hooks/convex/users";
import { useUser } from "@clerk/nextjs";
import { Loader } from "@/components/global/loader";

const Page = () => {
  const { user, isLoaded } = useUser();
  const { createUser, getUserByClerkId } = useUserConvexFuncs();
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);

  const convexUserResponse = getUserByClerkId;
  const existingUser = convexUserResponse?.success ? convexUserResponse.data : null;

  useEffect(() => {
    if (!isLoaded || !user) return;

    // If user already exists in database, redirect to dashboard
    if (existingUser) {
      router.push("/dashboard");
      return;
    }

    // If user doesn't exist and we're not already creating, create the user
    const handleUserCreation = async () => {
      if (isCreating) return;

      setIsCreating(true);

      try {
        await createUser({
          clerkId: user.id,
          name: user.firstName ?? "unknown",
          email: user.primaryEmailAddress?.emailAddress ?? "unknown",
          username: user.username ?? "unknown",
        });
        router.push("/dashboard");
      } catch (error) {
        console.error("Failed to create user:", error);
      } finally {
        setIsCreating(false);
      }
    };

    handleUserCreation();
  }, [isLoaded, user, existingUser, createUser, router, isCreating]);

  if (!isLoaded || isCreating) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-background">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-background">
      <Loader />
    </div>
  );
};

export default Page;
