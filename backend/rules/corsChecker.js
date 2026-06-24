module.exports = function corsChecker({ fileMap }) {
  const findings = [];

  for (const [filePath, content] of Object.entries(fileMap)) {
    if (/origin\s*:\s*['"`]\*['"`]/.test(content)) {
      findings.push({
        rule: "CORS_WILDCARD",
        severity: "high",
        message: "CORS origin set to wildcard (*). Any domain can access this API.",
        file: filePath,
      });
    }

    if (/app\.use\(cors\(\)\)/.test(content)) {
      findings.push({
        rule: "CORS_NO_CONFIG",
        severity: "medium",
        message: "cors() used without configuration. Defaults to wildcard origin.",
        file: filePath,
      });
    }
  }

  return findings;
};