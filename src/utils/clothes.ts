import { defaultClothes } from '../static/data/clothes';

export function getBuyedClothes(): string[] {
  return JSON.parse(localStorage.getItem("buyed") ?? JSON.stringify(defaultClothes));
}

export function getAppendClothes(): string[] {
  return JSON.parse(localStorage.getItem("append") ?? JSON.stringify(defaultClothes));
}

export function buyCloth(clothId: string): void {
  localStorage.setItem(
    "buyed",
    JSON.stringify([...getBuyedClothes(), clothId])
  );
}

export function replaceAppendCloth(
  oldClothId: string,
  newClothId: string
): void {
  localStorage.setItem(
    "append",
    JSON.stringify(
      getAppendClothes().map((cloth) => {
        if (cloth === oldClothId) {
          return newClothId;
        } else {
          return cloth;
        }
      })
    )
  );
}

export function appendCloth(clothId: string): void {
  localStorage.setItem(
    "append",
    JSON.stringify(Array.from(new Set([...getAppendClothes(), clothId])))
  );
}

export function removeCloth(clothId: string): void {
  localStorage.setItem(
    "append",
    JSON.stringify(getAppendClothes().filter((cloth) => cloth !== clothId))
  );
}
