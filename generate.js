const fs = require("fs");

const names = [
  "Naruto", "Sasuke", "Sakura", "Kakashi", "Itachi",
  "Gaara", "Lee", "Neji", "Hinata", "Shikamaru"
];

const locations = ["Konoha", "Suna", "Kiri", "Iwa", "Kumo"];
const healthStates = ["Healthy", "Injured", "Critical"];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomPower() {
  return Math.floor(Math.random() * (10000 - 100 + 1)) + 100;
}

const characters = [];

for (let i = 1; i <= 1000; i++) {
  characters.push({
    id: `char_${i}`,
    name: randomItem(names),
    location: randomItem(locations),
    health: randomItem(healthStates),
    power: randomPower()
  });
}

const db = {
  characters
};

fs.writeFileSync("db.json", JSON.stringify(db, null, 2));

console.log("✅ db.json with 1000 unique entries created");
