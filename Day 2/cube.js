import fs from "fs";

const data = fs
  .readFileSync(".\\Day 2\\input.txt", "utf8")
  .trim()
  .split("\n")
  .map((line) => line.slice(line.indexOf(":") + 2).split(";"));

const bag = {
  red: 12,
  green: 13,
  blue: 14,
};

// Part 1
const sum = data.reduce((accumulator, game, index) => {
  const filteredGame = game.every((set) => {
    set = set.split(",");
    return set.every((ball) => {
      const match = ball.match(`([0-9]+) ([a-z]+)`);
      return match[1] <= bag[match[2]];
    });
  });

  return filteredGame ? accumulator + index + 1 : accumulator;
}, 0);
console.log(sum);

// Part 2
const sumMinimum = data.reduce((accumulator, game) => {
  const minimumValues = Object.keys(bag).map((key) => {
    const values = game
      .flatMap((set) => set.split(","))
      .filter((item) => item.includes(key))
      .map((item) => +item.match(/([0-9]+)/)[0])
      .sort((a, b) => b - a);

    return values.length ? values[0] : 1;
  });

  const multiplication = minimumValues.reduce((a, b) => a * b, 1);
  return accumulator + multiplication;
}, 0);

console.log(sumMinimum);
