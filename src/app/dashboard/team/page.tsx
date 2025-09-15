"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useConvexTeamFuncs } from "@/lib/hooks/convex/teams";
import { useUserConvexFuncs } from "@/lib/hooks/convex/users";
import { challenges } from "@/lib/consts";
import { TeamDashboard } from "@/components/team/team-dashboard";

const Page = () => {
  const router = useRouter();

  const { getUserByClerkId } = useUserConvexFuncs();
  const convexUserResponse = getUserByClerkId;
  const convexUser = convexUserResponse?.success
    ? convexUserResponse.data
    : null;

  const { isUserInTeam, getTeamByUser } = useConvexTeamFuncs(
    undefined,
    convexUser?._id
  );

  useEffect(() => {
    if (!isUserInTeam) {
      router.push("/dashboard/challs");
    }
  }, [isUserInTeam]);

  const team = getTeamByUser;

  console.log(team);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-background">
      {team?.success && team.data ? (
        <TeamDashboard team={team.data} />
      ) : (
        <div>
          <h1>Team not found</h1>
        </div>
      )}
    </div>
  );
};

export default Page;
