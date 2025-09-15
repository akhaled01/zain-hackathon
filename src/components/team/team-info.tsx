import { Team } from "@/lib/types";
import { FC, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CustomBadge } from "@/components/global/custom-badge";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Copy, Check } from "lucide-react";
import { useUserConvexFuncs } from "@/lib/hooks/convex/users";
import { TeamMembersList } from "./team-members-list";
import { TeamActions } from "./team-actions";

export const TeamInfo: FC<{ team: Team }> = ({ team }) => {
  const [copiedCode, setCopiedCode] = useState(false);

  const { getUserByClerkId } = useUserConvexFuncs();
  const convexUserResponse = getUserByClerkId;
  const currentUser = convexUserResponse?.success ? convexUserResponse.data : null;
  
  const isCreator = currentUser?._id === team.creatorId;

  const copyTeamCode = async () => {
    await navigator.clipboard.writeText(team.teamCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <CardTitle className="text-lg font-semibold">
              {team.name} Information
            </CardTitle>
            <code className="font-mono bg-muted px-2 py-1 rounded text-sm font-medium">
              {team.teamCode}
            </code>
            <Button
              variant="outline"
              size="sm"
              onClick={copyTeamCode}
              className="h-7 w-7 p-0"
            >
              {copiedCode ? (
                <Check className="w-3 h-3 text-green-600" />
              ) : (
                <Copy className="w-3 h-3" />
              )}
            </Button>
            <CustomBadge variant={team.confirmed ? "success" : "warning"} size="sm">
              {team.confirmed ? "Confirmed" : "Pending"}
            </CustomBadge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <TeamMembersList team={team} currentUser={currentUser} />
        <TeamActions team={team} isCreator={isCreator} />
      </CardContent>
    </Card>
  );
};
