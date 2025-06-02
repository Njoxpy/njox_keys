// file to check if the env variables for project exists
// scripts/env.check.js
const fs = require("fs");
const path = require("path");

const envPath = path.resolve(__dirname, "../.env");
const examplePath = path.resolve(__dirname, "../.env.example");

if (!fs.existsSync(envPath)) {
  console.error("❌ .env file not found!");
  process.exit(1);
}

const requiredKeys = fs
  .readFileSync(examplePath, "utf-8")
  .split("\n")
  .filter((line) => line.trim() && !line.startsWith("#"))
  .map((line) => line.split("=")[0]);

const actualEnv = fs
  .readFileSync(envPath, "utf-8")
  .split("\n")
  .filter((line) => line.trim() && !line.startsWith("#"))
  .reduce((acc, line) => {
    const [key, value] = line.split("=");
    acc[key] = value;
    return acc;
  }, {});

let missingKeys = requiredKeys.filter((key) => !(key in actualEnv));

if (missingKeys.length > 0) {
  console.error("⚠️ Missing env keys:", missingKeys.join(", "));
  process.exit(1);
} else {
  console.log("✅ All required env keys found. Starting...");
}
