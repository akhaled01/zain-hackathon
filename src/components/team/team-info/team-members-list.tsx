import { Team } from "@/lib/types";
import { FC, useState } from "react";
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
import { Users, Crown, UserMinus } from "lucide-react";
import { useConvexTeamFuncs } from "@/lib/hooks/convex/teams";

interface TeamMembersListProps {
  team: Team;
  currentUser: any;
}

export const TeamMembersList: FC<TeamMembersListProps> = ({ team, currentUser }) => {
  const [removingMember, setRemovingMember] = useState<string | null>(null);
  const { removeMember } = useConvexTeamFuncs();
  
  const isCreator = currentUser?._id === team.creatorId;

  const handleRemoveMember = async (memberId: string) => {
    if (!currentUser?._id || !team._id) return;
    
    setRemovingMember(memberId);
    try {
      await removeMember({
        teamId: team._id as any,
        userId: memberId as any,
        creatorId: currentUser._id as any
      });
    } catch (error) {
      console.error("Failed to remove member:", error);
    } finally {
      setRemovingMember(null);
    }
  };

  // Mock member data - replace with actual member data from your backend
  const mockMembers = [
    { id: team.creatorId, name: "Team Creator", email: "creator@example.com", isCreator: true },
    ...team.members.slice(0, 3).map((memberId, index) => ({
      id: memberId,
      name: `Member ${index + 1}`,
      email: `member${index + 1}@example.com`,
      isCreator: false
    }))
  ];

  return (
    <div>
      <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-3">
        Team Members ({mockMembers.length})
      </h4>
      
      <div className="space-y-2">
        {mockMembers.map((member) => (
          <div
            key={member.id}
            className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                {member.isCreator ? (
                  <Crown className="w-4 h-4 text-primary" />
                ) : (
                  <Users className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
              <div>
                <p className="font-medium text-sm">{member.name}</p>
                <p className="text-xs text-muted-foreground">{member.email}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {member.isCreator && (
                <CustomBadge variant="info" size="sm">Creator</CustomBadge>
              )}
              
              {isCreator && !member.isCreator && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                      disabled={removingMember === member.id}
                    >
                      <UserMinus className="w-4 h-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Remove Team Member</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to remove {member.name} from the team? 
                        This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleRemoveMember(member.id)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Remove Member
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
