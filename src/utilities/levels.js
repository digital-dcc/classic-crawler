export const levelThresholds = new Map([
  [0, 0],
  [1, 10],
  [2, 50],
  [3, 110],
  [4, 190],
  [5, 290],
  [6, 410],
  [7, 550],
  [8, 710],
  [9, 890],
  [10, 1090],
]);

export function levelForXp(xp) {
  for (let [level, threshold] of Array.from(
    levelThresholds.entries()
  ).reverse()) {
    if (xp >= threshold) return level;
  }
}

export function xpForNextLevel(currentLevel) {
  return levelThresholds.get(currentLevel + 1);
}
