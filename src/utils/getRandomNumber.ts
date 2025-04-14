export function getRandomNumber(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

// from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random