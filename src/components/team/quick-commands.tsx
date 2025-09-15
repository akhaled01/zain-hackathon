import { FC } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const QuickCommands: FC = () => (
  <Card className="mb-6">
    <CardHeader>
      <CardTitle>Quick Commands</CardTitle>
      <CardDescription>Copy these commands to get started</CardDescription>
    </CardHeader>
    <CardContent className="space-y-3">
      <div>
        <h4 className="font-medium mb-2">Clone Repository</h4>
        <div className="bg-muted p-3 rounded-md font-mono text-sm">
          git clone https://github.com/team/project.git
        </div>
      </div>
      <div>
        <h4 className="font-medium mb-2">Repository URL</h4>
        <div className="bg-muted p-3 rounded-md font-mono text-sm">
          https://github.com/team/project
        </div>
      </div>
    </CardContent>
  </Card>
);
