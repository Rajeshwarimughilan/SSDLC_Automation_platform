const { readFilesRecursively, readPackageJson, readEnvFile } = require("./fileReader");

const jwtChecker = require("../rules/jwtChecker");
const helmetChecker = require("../rules/helmetChecker");
const corsChecker = require("../rules/corsChecker");
const authChecker = require("../rules/authChecker");
const validationChecker = require("../rules/validationChecker");
const secretScanner = require("../rules/secretScanner");
const rateLimitChecker = require("../rules/rateLimitChecker");
const passwordChecker = require("../rules/passwordChecker");
const dependencyChecker = require("../rules/dependencyChecker");

const { calculateRisk } = require("../risk/riskEngine");
const { saveFindings } = require("../tracker/vulnTracker");

async function runScan(projectPath) {
  console.log(`\nStarting scan on: ${projectPath}`);

  const fileMap = readFilesRecursively(projectPath);
  const packageJson = readPackageJson(projectPath);
  const envFile = readEnvFile(projectPath);

  const context = { fileMap, packageJson, envFile, projectPath };

  // run all rule modules
  const findings = [
    ...jwtChecker(context),
    ...helmetChecker(context),
    ...corsChecker(context),
    ...authChecker(context),
    ...validationChecker(context),
    ...secretScanner(context),
    ...rateLimitChecker(context),
    ...passwordChecker(context),
    ...dependencyChecker(context),
  ];

  // score it
  const riskReport = calculateRisk(findings);

  // save to SQLite
  await saveFindings(projectPath, findings);

  return {
    projectPath,
    scannedAt: new Date().toISOString(),
    totalFindings: findings.length,
    riskReport,
    findings,
  };
}

module.exports = { runScan };