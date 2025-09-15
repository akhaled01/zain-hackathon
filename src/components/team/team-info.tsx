import { Team } from "@/lib/types";
import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

export const TeamInfo: FC<{ team: Team }> = ({ team }) => (
  <Card className="mb-6">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Users className="w-5 h-5" />
        Team Information
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div>
        <h4 className="font-medium mb-2">Team Name</h4>
        <p className="text-lg">{team.name}</p>
      </div>
      <div>
        <h4 className="font-medium mb-2">Team Code</h4>
        <p className="font-mono bg-muted px-3 py-2 rounded-md inline-block">
          {team.teamCode}
        </p>
      </div>
      <div>
        <h4 className="font-medium mb-2">Members</h4>
        <p className="text-muted-foreground">{team.members.length} member(s)</p>
      </div>
    </CardContent>
  </Card>
);
