const fs = require("fs");
const path = require("path");

const SUPPORTED_EXTENSIONS = [".js", ".ts", ".env", ".json"];

function readFilesRecursively(dirPath, fileMap = {}) {
  if (!fs.existsSync(dirPath)) {
    throw new Error(`Path does not exist: ${dirPath}`);
  }

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    // skip node_modules and .git
    if (entry.name === "node_modules" || entry.name === ".git") continue;

    if (entry.isDirectory()) {
      readFilesRecursively(fullPath, fileMap);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name);
      if (SUPPORTED_EXTENSIONS.includes(ext)) {
        fileMap[fullPath] = fs.readFileSync(fullPath, "utf-8");
      }
    }
  }

  return fileMap;
}

function readPackageJson(dirPath) {
  const pkgPath = path.join(dirPath, "package.json");
  if (!fs.existsSync(pkgPath)) return null;
  return JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
}

function readEnvFile(dirPath) {
  const envPath = path.join(dirPath, ".env");
  if (!fs.existsSync(envPath)) return null;
  return fs.readFileSync(envPath, "utf-8");
}

module.exports = { readFilesRecursively, readPackageJson, readEnvFile };