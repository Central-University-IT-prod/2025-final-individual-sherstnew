import { Exercise } from "../static/types/Exercise";
import { initialExercises } from "../static/data/initial";

export function getExercises(): Exercise[] {
  const exercises = JSON.parse(localStorage.getItem("exercises") ?? "[]");
  if (exercises.length > 0) {
    return exercises;
  }
  initExercises();
  return initialExercises;
}

export function getExerciseById(id: string): Exercise | undefined {
  return getExercises().find((exercise) => exercise.id === id);
}

export function initExercises() {
  localStorage.setItem("exercises", JSON.stringify(initialExercises));
}

export function createExercise(exercise: Exercise): void {
  const exercises = getExercises();
  exercises.push(exercise);

  localStorage.setItem("exercises", JSON.stringify(exercises));
}

export function updateExercise(exerciseToEdit: Exercise): void {
  const exercises = getExercises();
  localStorage.setItem(
    "exercises",
    JSON.stringify(
      exercises.map((exercise) => {
        if (exerciseToEdit.id === exercise.id) {
          return exerciseToEdit;
        }
        return exercise;
      })
    )
  );
}

export function deleteExercise(id: string): void {
  const exercises = getExercises();

  localStorage.setItem(
    "exercises",
    JSON.stringify(exercises.filter((exercise) => exercise.id !== id))
  );
}
