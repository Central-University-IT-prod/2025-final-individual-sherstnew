import { Personal } from "../static/types/Personal";
import { callAchievement } from "./achievements";

export function getPersonal(): Personal {
  return JSON.parse(
    localStorage.getItem("personal") ?? '{"weight": 40, "height": 140}'
  );
}

export function updatePersonal(field: keyof Personal, value: number): void {
  if (field === "height" && value > 200) {
    callAchievement("Шпала");
  }
  const personal = {
    ...getPersonal(),
    [field]: value,
  };
  if (personal.weight < 40 || personal.weight > 400) {
    personal.weight = 40;
  }
  if (personal.height < 140 || personal.height > 250) {
    personal.height = 140;
  }
  localStorage.setItem("personal", JSON.stringify(personal));
}
