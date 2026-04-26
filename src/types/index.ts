export type Lesson = {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  readTime: number;
  quiz: QuizQuestion[];
};

export type Country = {
  id: string;
  name: string;
  votingAge: number;
  electionType: string;
  electionFrequency: string;
  registrationProcess: string;
  votingMethod: string;
  electoralSystem: string;
  compulsoryVoting: boolean;
  mailInVoting: boolean;
  onlineVoting: boolean;
  managementBody: string;
  voterTurnout: number;
  youthParticipation: number;
};

export type TimelineStage = {
  id: string;
  title: string;
  description: string;
  status: 'upcoming' | 'active' | 'completed';
  dateRange: string;
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
};

export type FAQ = {
  id: string;
  question: string;
  answer: string;
};
