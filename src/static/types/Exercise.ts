import { Difficulty } from './Difficulty';
import { GoalType } from './GoalType';

export interface Exercise {
  id: string;
  name: string;
  instruction: string;
  images: string[];
  videos: string[];
  difficulty: Difficulty;
  equipment: string[];
  attributes: string[];
  goalType: GoalType;
}