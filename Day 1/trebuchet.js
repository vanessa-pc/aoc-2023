import fs from "fs";

const data = fs.readFileSync(".\\Day 1\\input.txt", "utf8").trim().split("\n");

//Part 1
const sum = (data) => {
  return data.reduce((total, line) => {
    const filteredLine = line.replace(/\D/g, "");
    return total + Number(filteredLine[0] + filteredLine.slice(-1));
  }, 0);
};

console.log(sum(data));

// Part 2
const digitMap = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const replaceWordedDigits = data.map((line) => {
  const regex = new RegExp(`(?=(\d|${Object.keys(digitMap).join("|")}))`, "g");
  const matches = [...line.matchAll(regex)].map((match) => match[1]);
  matches?.forEach((match) => {
    const replacedWord = match[0] + digitMap[match] + match.slice(-1);
    line = line.replace(match, replacedWord);
    return line;
  });
  return line;
});

console.log(sum(replaceWordedDigits));
