"use client";

import { useRouter } from "next/router";
import { useEffect } from "react";
import { useConvexTeamFuncs } from "@/lib/hooks/convex/teams";

const Page = () => {
  const router = useRouter();
  const { isUserInTeam } = useConvexTeamFuncs();

  useEffect(() => {
    if (!isUserInTeam) {
      router.push("/dashboard/challs");
    }
  }, [router, isUserInTeam]);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-background">
      Team
    </div>
  );
};

export default Page;
