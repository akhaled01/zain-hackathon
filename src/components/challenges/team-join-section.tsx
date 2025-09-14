import { useUser } from "@clerk/nextjs";
import { useConvexTeamFuncs } from "@/lib/hooks/convex/teams";
import { useUserConvexFuncs } from "@/lib/hooks/convex/users";

export const TeamJoinSection = () => {
  const { user } = useUser();
  const { getUserByClerkId } = useUserConvexFuncs();
  
  const convexUserResponse = getUserByClerkId;
  const convexUser = convexUserResponse?.success ? convexUserResponse.data : null;
  
  const { getTeamByUser } = useConvexTeamFuncs(undefined, convexUser?._id);
  
  const userTeamResponse = getTeamByUser;
  const userTeam = userTeamResponse?.success ? userTeamResponse.data : null;

  return (
    <div>
      <h2>Team Join Section</h2>
      {userTeam ? (
        <div>
          <p>You are already part of team: {userTeam.name}</p>
          <p>Team Code: {userTeam.teamCode}</p>
        </div>
      ) : (
        <div>
          <p>You are not part of any team yet.</p>
          {/* Add team creation/joining UI here */}
        </div>
      )}
    </div>
  );
};