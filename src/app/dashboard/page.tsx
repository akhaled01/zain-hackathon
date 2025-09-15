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

  const convexUserResponse = getUserByClerkId;
  const convexUser = convexUserResponse?.success
    ? convexUserResponse.data
    : null;

  console.log(convexUser);

  useEffect(() => {
    if (!isLoaded || !user) return;

    if (convexUser === null) {
      router.push("/more-info");
    }

    if (!convexUser?.teamId) {
      router.push("/dashboard/challs");
    }

    if (convexUser?.teamId) {
      router.push("/dashboard/team");
    }
  }, [isLoaded, user, convexUser, router]);

  if (!isLoaded || !user || convexUser === undefined) {
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
