import { Team } from "@/lib/types";
import { FC } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomBadge } from "@/components/global/custom-badge";
import { challenges } from "@/lib/consts";

export const TeamHeader: FC<{ team: Team }> = ({ team }) => {
  const challenge = challenges.find(c => c.id === team.challengeId);
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              {challenge?.icon && <challenge.icon className="w-6 h-6 text-primary" />}
            </div>
            <div>
              <CardTitle className="text-2xl">{challenge?.title || "Challenge"}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <CustomBadge variant="info">{challenge?.category}</CustomBadge>
              </div>
            </div>
          </div>
        </div>
        <CardDescription className="mt-3">
          {challenge?.description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
