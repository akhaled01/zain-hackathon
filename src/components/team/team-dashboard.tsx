import { Team } from "@/lib/types";
import { FC } from "react";
import { TeamHeader } from "./team-header";
import { TeamInfo } from "./team-info";
import { QuickCommands } from "./quick-commands";
import { DataReservoir } from "./data-reservoir";

export const TeamDashboard: FC<{ team: Team }> = ({ team }) => (
  <div className="container mx-auto p-6 max-w-6xl">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <TeamHeader team={team} />
        <DataReservoir />
      </div>
      <div className="space-y-6">
        <TeamInfo team={team} />
        <QuickCommands />
      </div>
    </div>
  </div>
);
