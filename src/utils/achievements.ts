export function getAchievements(): string[] {
  return JSON.parse(localStorage.getItem("achievements") ?? "[]");
}

export function addAchievement(achievement: string): void {
  localStorage.setItem(
    "achievements",
    JSON.stringify([...getAchievements(), achievement])
  );
}

export function getCallAchievement(): string {
  return localStorage.getItem("callAch") ?? "";
}

export function callAchievement(achievement: string): void {
  if (!getAchievements().includes(achievement)) {
    localStorage.setItem("callAch", achievement);
    addAchievement(achievement);
    window.dispatchEvent(new Event("storage"));
  }
}

export function deleteCallAchievement(): void {
  localStorage.removeItem("callAch");
}
