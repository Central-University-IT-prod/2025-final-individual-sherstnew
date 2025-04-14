import { GoalType } from "../static/types/GoalType";
import { Personal } from "../static/types/Personal";
import { getRandomNumber } from './getRandomNumber';

export function getPersonalGoal(
  goalType: GoalType,
  personal: Personal
): number {
  if (personal.weight < 40 || personal.height < 140) {
    return 0;
  } else {
    return Math.floor(goalType === GoalType.COUNT
      ? (personal.weight / (personal.height - 100)) * 20 * getRandomNumber(0.8, 1.2)
      : goalType === GoalType.TIME
      ? (personal.weight / (personal.height - 100)) * 60 * getRandomNumber(0.8, 1.2)
      : 0);
  }
}
