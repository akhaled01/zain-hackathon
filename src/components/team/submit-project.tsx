import { FC, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Send, CheckCircle, Sparkles } from "lucide-react";
import { useConvexSubmissionsFuncs } from "@/lib/hooks/convex/submissions";
import { Team } from "@/lib/types";

interface SubmissionSectionProps {
  team: Team;
  challengeId: number;
}

export const SubmissionSection: FC<SubmissionSectionProps> = ({ team, challengeId }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { createSubmission } = useConvexSubmissionsFuncs();

  const handleSubmit = async () => {
    if (!team._id) return;
    
    setIsSubmitting(true);
    try {
      await createSubmission({
        teamId: team._id as any,
        challengeId: challengeId
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error("Failed to submit project:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="mb-6 border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="rounded-full bg-primary/10 p-3">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Project Submitted Successfully! 🎉
              </h3>
              <p className="text-muted-foreground mb-4">
                Your team's hard work has been submitted for judging. 
              </p>
              <div className="flex items-center justify-center gap-2 text-primary">
                <Sparkles className="w-4 h-4" />
                <span className="font-medium">Best of luck, {team.name}!</span>
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader className="pb-6">
        <CardTitle className="text-2xl font-bold text-foreground">Submit Your Project</CardTitle>
        <CardDescription className="text-muted-foreground">
          Ready to submit your team's project for judging? This action cannot be undone.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button 
              disabled={isSubmitting} 
              className="w-full"
              size="lg"
            >
              <Send className="w-4 h-4 mr-2" />
              {isSubmitting ? "Submitting..." : "Submit Project"}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-foreground">Confirm Project Submission</AlertDialogTitle>
              <AlertDialogDescription className="text-muted-foreground">
                Are you sure you want to submit "{team.name}"'s project for Challenge {challengeId}? 
                Once submitted, you cannot make any changes to your submission.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleSubmit}>
                Submit Project
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
};
