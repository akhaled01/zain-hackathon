export interface Challenge {
  id: number;
  title: string;
  shortDescription: string;
  description: string;
  category: string;
  icon: any;
  exampleIdeas: string[];
  toolsAndTech: { [key: string]: string[] };
  deliverables: string[];
  dataNote: string;
  registeredTeams?: number;
}

export interface ScheduleEvent {
  time: string;
  title: string;
  desc: string;
}

export interface ScheduleDay {
  day: string;
  date: string;
  events: ScheduleEvent[];
}

export interface NavigationProps {
  scrollToSection: (sectionId: string) => void;
}

export interface Team {
  _id?: string;
  name: string;
  creatorId: string;
  confirmed: boolean;
  teamCode: string;
  challengeId: number;
  members: string[];
}