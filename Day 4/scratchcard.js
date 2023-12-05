import fs from "fs";
const data = fs.readFileSync(".\\Day 4\\input.txt", "utf8").trim().split("\n");
let copies = data.map((_) => 1);
const sum = data.reduce((total, line, index) => {
  let winningNumbers = line
    .slice(line.indexOf(":") + 1, line.indexOf("|"))
    .split(" ")
    .filter((number) => number.length > 0);

  let cardNumbers = line
    .slice(line.indexOf("|") + 1)
    .split(" ")
    .filter((number) => winningNumbers.includes(number));

  for (let i = index + 1; i <= index + cardNumbers.length; i++) {
    copies[i] += copies[index];
  }
  return cardNumbers.length ? total + 2 ** (cardNumbers.length - 1) : total;
}, 0);

const copiesCount = copies.reduce((total, copy) => total + copy, 0);
console.log("sum", sum);
console.log("copiesCount", copiesCount);
