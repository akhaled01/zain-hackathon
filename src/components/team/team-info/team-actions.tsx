import { Team } from "@/lib/types";
import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
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
import { CheckCircle, Trash2 } from "lucide-react";
import { useConvexTeamFuncs } from "@/lib/hooks/convex/teams";

interface TeamActionsProps {
  team: Team;
  isCreator: boolean;
}

const ConfirmTeamDialog: FC<{ team: Team; onConfirm: () => void; isConfirming: boolean }> = ({ 
  team, onConfirm, isConfirming 
}) => (
  <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button disabled={isConfirming} className="w-full">
        <CheckCircle className="w-4 h-4 mr-2" />
        {isConfirming ? "Confirming..." : "Confirm Team"}
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Confirm Team</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to confirm "{team.name}"? Once confirmed, the team will be 
          locked for the hackathon and no new members can join.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={onConfirm}>
          Confirm Team
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

const DeleteTeamDialog: FC<{ team: Team; onDelete: () => void; isDeleting: boolean }> = ({ 
  team, onDelete, isDeleting 
}) => (
  <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button variant="destructive" disabled={isDeleting} className="w-full">
        <Trash2 className="w-4 h-4 mr-2" />
        Delete Team
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Delete Team</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to delete "{team.name}"? This will remove all team members 
          and cannot be undone. All team progress will be lost.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={onDelete}
          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
        >
          {isDeleting ? "Deleting..." : "Delete Team"}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

export const TeamActions: FC<TeamActionsProps> = ({ team, isCreator }) => {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const { confirmTeam, leaveTeam } = useConvexTeamFuncs();

  const handleConfirmTeam = async () => {
    if (!team._id) return;
    
    setIsConfirming(true);
    try {
      await confirmTeam({
        teamId: team._id as any
      });
    } catch (error) {
      console.error("Failed to confirm team:", error);
    } finally {
      setIsConfirming(false);
    }
  };

  const handleDeleteTeam = async () => {
    if (!team._id) return;
    
    setIsDeleting(true);
    try {
      await leaveTeam({
        teamId: team._id as any,
        userId: team.creatorId as any
      });
    } catch (error) {
      console.error("Failed to delete team:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isCreator) {
    return null;
  }

  return (
    <div>
      <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-3">
        Team Actions
      </h4>
      
      <div className="space-y-2">
        {!team.confirmed && (
          <ConfirmTeamDialog 
            team={team} 
            onConfirm={handleConfirmTeam} 
            isConfirming={isConfirming} 
          />
        )}
        
        <DeleteTeamDialog 
          team={team} 
          onDelete={handleDeleteTeam} 
          isDeleting={isDeleting} 
        />
      </div>
    </div>
  );
};
