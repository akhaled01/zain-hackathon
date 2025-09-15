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
import { useUser } from "@clerk/nextjs";
import { useUserConvexFuncs } from "@/lib/hooks/convex/users";

interface TeamMembersListProps {
  team: Team;
  currentUser: any;
}

export const TeamMembersList: FC<TeamMembersListProps> = ({ team, currentUser }) => {
  const [removingMember, setRemovingMember] = useState<string | null>(null);
  const { removeMember } = useConvexTeamFuncs();
  const { user: clerkUser } = useUser();
  const { getUserById } = useUserConvexFuncs();
  
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

  // Create actual member list from team data
  const allMemberIds = [team.creatorId, ...team.members];
  const uniqueMemberIds = [...new Set(allMemberIds)]; // Remove duplicates if creator is also in members array
  
  const teamMembers = uniqueMemberIds.map((memberId) => {
    const isCreatorMember = memberId === team.creatorId;
    
    // For the current user, use Clerk data if available
    if (currentUser?.id === memberId && clerkUser) {
      return {
        id: memberId,
        name: clerkUser.fullName || clerkUser.firstName || "You",
        email: clerkUser.primaryEmailAddress?.emailAddress || "No email",
        isCreator: isCreatorMember
      };
    }
    
    // For other members, try to fetch their data from Convex
    const memberData = getUserById(memberId as any);
    const userData = memberData?.success ? memberData.data : null;
    
    return {
      id: memberId,
      name: userData?.name || (isCreatorMember ? "Team Creator" : "Team Member"),
      email: userData?.email || "Member",
      isCreator: isCreatorMember
    };
  });

  return (
    <div>
      <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-3">
        Team Members ({teamMembers.length})
      </h4>
      
      <div className="space-y-2">
        {teamMembers.map((member) => (
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
