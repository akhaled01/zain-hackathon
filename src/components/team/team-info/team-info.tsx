import { Team } from "@/lib/types";
import { FC, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CustomBadge } from "@/components/global/custom-badge";
import { Copy, Check } from "lucide-react";
import { useUserConvexFuncs } from "@/lib/hooks/convex/users";
import { TeamMembersList } from "./team-members-list";
import { TeamActions } from "./team-actions";

export const TeamInfo: FC<{ team: Team }> = ({ team }) => {
  const [copiedCode, setCopiedCode] = useState(false);

  const { getUserByClerkId } = useUserConvexFuncs();
  const convexUserResponse = getUserByClerkId;
  const currentUser = convexUserResponse?.success
    ? convexUserResponse.data
    : null;

  const isCreator = currentUser?._id === team.creatorId;

  const copyTeamCode = async () => {
    await navigator.clipboard.writeText(team.teamCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-6">
        <div className="space-y-4">
          {/* Main title section */}
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold text-foreground">
              {team.name}
            </CardTitle>
            <CustomBadge
              variant={team.confirmed ? "success" : "warning"}
              className="text-sm font-medium px-3 py-1"
            >
              {team.confirmed ? "Confirmed" : "Pending"}
            </CustomBadge>
          </div>
          
          {/* Team code section - only show if team is not confirmed */}
          {!team.confirmed && (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Team Code
              </span>
              <div className="flex items-center gap-2">
                <code className="font-mono bg-muted/50 border px-3 py-1.5 rounded-md text-sm font-semibold tracking-wider">
                  {team.teamCode}
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyTeamCode}
                  className="h-8 w-8 p-0 hover:bg-muted/80"
                  title="Copy team code"
                >
                  {copiedCode ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <TeamMembersList team={team} currentUser={currentUser} />
        <TeamActions team={team} isCreator={isCreator} />
      </CardContent>
    </Card>
  );
};
