export interface Challenge {
  id: number;
  title: string;
  shortDescription: string;
  description: string;
  category: string;
  difficulty: string;
  icon: any;
  exampleIdeas: string[];
  toolsAndTech: string[];
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
