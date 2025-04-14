export function getCoins(): number {
  return Number(localStorage.getItem("coins") ?? "50");
}

export function earnCoins(coins: number): void {
  localStorage.setItem("coins", String(getCoins() + coins));
  window.dispatchEvent(new Event("storage"));
}

export function spendCoins(coins: number): void {
  localStorage.setItem("coins", String(getCoins() - coins));
  window.dispatchEvent(new Event("storage"));
}