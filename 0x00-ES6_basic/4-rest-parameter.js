export default function returnHowManyArguments(...rest) {
  let n = 0;
  for (const arg in rest) {
    n += 1;
  }
  return n;
}
