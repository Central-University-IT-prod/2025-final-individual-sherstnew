import { Goal, GoalType } from "./GoalType";

export interface Training {
  id: string;
  name: string;
  description: string;
  exercises: string[];
  restTime: number;
  goals: { exerciseId: string; goal: Goal<GoalType> }[];
}
