export const findLevels = ["/find1", "/find2", "/find3"];

export function getRandomFindOrder() {
  // Random hanya find1 dan find2, find3 selalu di akhir
  const arr = ["/find1", "/find2"];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  arr.push("/find3");
  return arr;
}
