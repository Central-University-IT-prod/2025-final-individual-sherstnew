import { initialTrainings } from "../static/data/initial";
import { Training } from "../static/types/Training";
import { callAchievement } from "./achievements";

export function getTrainings(): Training[] {
  const trainings = JSON.parse(localStorage.getItem("trainings") ?? "[]");
  if (trainings.length > 0) {
    return trainings;
  }
  initTrainings();
  return initialTrainings;
}

export function getTrainingById(id: string): Training | undefined {
  return getTrainings().find((training) => training.id === id);
}

export function initTrainings() {
  localStorage.setItem("trainings", JSON.stringify(initialTrainings));
}

export function createTraining(training: Training): void {
  const trainings = getTrainings();
  if (trainings.length === 3 || trainings.length === 0) {
    callAchievement("Создана первая тренировка");
  }
  trainings.push(training);

  localStorage.setItem("trainings", JSON.stringify(trainings));
}

export function deleteTraining(id: string): void {
  const trainings = getTrainings();

  localStorage.setItem(
    "trainings",
    JSON.stringify(trainings.filter((training) => training.id !== id))
  );
}

export function getTrainingsStatistics(): number {
  return Number(localStorage.getItem("statistics") ?? "0");
}

export function increaseTrainingsStatistics(): void {
  if (getTrainingsStatistics() === 0) {
    callAchievement("Первая тренировка");
  }
  if (getTrainingsStatistics() === 1) {
    callAchievement("Вторая тренировка (теперь ты качок)");
  }
  localStorage.setItem("statistics", String(getTrainingsStatistics() + 1));
}

export function getGoal(): number {
  return Number(localStorage.getItem("goal") ?? "0");
}

export function setGoal(goal: number): void {
  if (goal > 1000) {
    callAchievement("Тренировочный монстр");
  }
  localStorage.setItem("goal", String(goal));
}
