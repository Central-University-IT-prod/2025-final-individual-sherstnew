export enum GoalType {
  COUNT,
  TIME,
  OTHER,
}

export type Goal<T> = T extends GoalType.OTHER ? string : number;