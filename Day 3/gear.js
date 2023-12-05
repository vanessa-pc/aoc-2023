import fs from "fs";
const data = fs.readFileSync(".\\Day 3\\input.txt", "utf8").trim().split("\n");

let symbolMatches = [];
data.forEach((line, index) => {
  [...line.matchAll(`[^a-zA-Z0-9.]`)].map((match) =>
    symbolMatches.push([index, match.index])
  );
});
let numbers = Object.fromEntries(symbolMatches.map((x) => [x, []]));

data.map((line, index) => {
  let matches = [...line.matchAll(`\\d+`)].map((match) => [
    index,
    +match[0],
    Array.from(
      { length: match.index + match[0].length - 1 - match.index + 1 },
      (_, i) => match.index + i
    ),
  ]);
  matches.forEach((match) => {
    let edges = [];
    for (let i = index - 1; i <= index + 1; i++) {
      for (let c = match[2][0] - 1; c <= match[2][0] + match[2].length; c++) {
        edges.push([i, c]);
      }
    }

    let included = edges.filter((edge) => {
      return symbolMatches.some(
        (item) => JSON.stringify(item) === JSON.stringify(edge)
      );
    });

    included.length ? numbers[included[0]].push(match[1]) : null;
  });
});

// Part 1
const sum = Object.values(numbers)
  .flat()
  .reduce((a, b) => a + b, 0);
console.log("sum", sum);

// Part 2
const sum2 = Object.values(numbers)
  .filter((item) => item.length === 2)
  .reduce((total, number) => total + number[0] * number[1], 0);
console.log("sum2", sum2);
