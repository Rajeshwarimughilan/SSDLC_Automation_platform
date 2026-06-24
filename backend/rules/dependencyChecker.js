const { execSync } = require("child_process");
const path = require("path");

module.exports = function dependencyChecker({ projectPath }) {
  const findings = [];

  try {
    const output = execSync("npm audit --json", {
      cwd: projectPath,
      timeout: 30000,
    }).toString();

    const audit = JSON.parse(output);
    const vulns = audit.vulnerabilities || {};

    for (const [pkgName, details] of Object.entries(vulns)) {
      const severity = details.severity;
      const mapped = severity === "critical" || severity === "high" ? severity : "medium";

      findings.push({
        rule: "VULNERABLE_DEPENDENCY",
        severity: mapped,
        message: `Package "${pkgName}" has a ${severity} vulnerability. ${details.fixAvailable ? "Fix available via npm audit fix." : "No automatic fix available."}`,
        file: "package.json",
      });
    }
  } catch (err) {
    // npm audit exits with code 1 when vulns found — parse stdout anyway
    if (err.stdout) {
      try {
        const audit = JSON.parse(err.stdout.toString());
        const vulns = audit.vulnerabilities || {};

        for (const [pkgName, details] of Object.entries(vulns)) {
          const severity = details.severity;
          const mapped =
            severity === "critical" || severity === "high" ? severity : "medium";

          findings.push({
            rule: "VULNERABLE_DEPENDENCY",
            severity: mapped,
            message: `Package "${pkgName}" has a ${severity} vulnerability. ${details.fixAvailable ? "Fix available." : "No automatic fix."}`,
            file: "package.json",
          });
        }
      } catch (_) {}
    }
  }

  return findings;
};