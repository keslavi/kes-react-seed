import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seedDir = path.resolve(__dirname, "..");
const repoDir = path.resolve(seedDir, "..");
const formhelperDir = path.resolve(repoDir, "formhelper-mui");

const formhelperDistDir = path.join(formhelperDir, "dist");
const formhelperStorybookDir = path.join(formhelperDir, "storybook-static");
const seedDistDir = path.join(seedDir, "formhelper-mui-dist");
const seedStorybookDir = path.join(seedDir, "public", "storybook");

const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";

function quoteShellArg(value) {
  if (!/[\s"]/u.test(value)) {
    return value;
  }

  return `"${value.replace(/"/g, '\\"')}"`;
}

function run(command, args, cwd) {
  const result = process.platform === "win32"
    ? spawnSync([command, ...args].map(quoteShellArg).join(" "), {
        cwd,
        stdio: "inherit",
        shell: true,
      })
    : spawnSync(command, args, {
        cwd,
        stdio: "inherit",
        shell: false,
      });

  if (result.error) {
    console.error(result.error.message);
    process.exit(1);
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function replaceDirectory(sourceDir, targetDir) {
  rmSync(targetDir, { recursive: true, force: true });
  mkdirSync(path.dirname(targetDir), { recursive: true });
  cpSync(sourceDir, targetDir, { recursive: true });
}

if (!existsSync(formhelperDir)) {
  console.error(`Missing formhelper-mui folder: ${formhelperDir}`);
  process.exit(1);
}

console.log("Installing formhelper-mui dependencies...");
run(npmCommand, ["ci", "--include=dev"], formhelperDir);

console.log("Building formhelper-mui library...");
run(npmCommand, ["run", "build"], formhelperDir);

console.log("Building formhelper-mui storybook...");
run(npmCommand, ["run", "build-storybook"], formhelperDir);

if (!existsSync(formhelperDistDir)) {
  console.error(`Missing formhelper-mui dist output: ${formhelperDistDir}`);
  process.exit(1);
}

if (!existsSync(formhelperStorybookDir)) {
  console.error(`Missing formhelper-mui storybook output: ${formhelperStorybookDir}`);
  process.exit(1);
}

console.log("Copying formhelper-mui dist into seed...");
replaceDirectory(formhelperDistDir, seedDistDir);

console.log("Copying storybook into seed/public/storybook...");
replaceDirectory(formhelperStorybookDir, seedStorybookDir);

console.log("formhelper-mui assets synced into seed.");