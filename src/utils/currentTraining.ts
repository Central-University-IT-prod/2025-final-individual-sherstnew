import { initialCurrentTraining } from '../static/data/initial';
import { Training } from "../static/types/Training";

export function getCurrentTraining(): Training {
  const currentTraining = localStorage.getItem("currentTraining");
  if (currentTraining) {
    return JSON.parse(currentTraining);
  } else {
    updateCurrentTraining(initialCurrentTraining);
    return initialCurrentTraining;
  }
}

export function updateCurrentTraining(training: Training): void {
  localStorage.setItem("currentTraining", JSON.stringify(training));
}