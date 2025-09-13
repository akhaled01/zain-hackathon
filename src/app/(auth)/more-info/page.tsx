"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUserConvexFuncs } from "@/lib/hooks/convex/users";
import { useUser } from "@clerk/nextjs";
import { Loader } from "@/components/global/loader";

const Page = () => {
  const { user, isLoaded } = useUser();
  const { createUser } = useUserConvexFuncs();
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    const handleUserCreation = async () => {
      if (!isLoaded || !user || isCreating) return;

      setIsCreating(true);

      try {
        await createUser({ clerkId: user.id });
        router.push("/dashboard");
      } catch (error) {
        console.error("Failed to create user:", error);
      } finally {
        setIsCreating(false);
      }
    };

    handleUserCreation();
  }, [isLoaded, user, createUser, router, isCreating]);

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
