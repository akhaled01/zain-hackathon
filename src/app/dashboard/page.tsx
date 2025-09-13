"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUserConvexFuncs } from "@/lib/hooks/convex/users";
import { Loader } from "@/components/global/loader";

const Page = () => {
  const { user, isLoaded } = useUser();
  const { getUserByClerkId } = useUserConvexFuncs();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded || !user) return;

    if (getUserByClerkId === null) {
      router.push("/more-info");
    }

    if (!getUserByClerkId?.teamId) {
      router.push("/dashboard/challs");
    }

    if (getUserByClerkId?.teamId) {
      router.push("/dashboard/team");
    }
  }, [isLoaded, user, getUserByClerkId, router]);

  if (!isLoaded || !user || getUserByClerkId === undefined) {
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
