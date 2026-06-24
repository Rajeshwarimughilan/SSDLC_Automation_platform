module.exports = function helmetChecker({ fileMap }) {
  const findings = [];
  let helmetFound = false;

  for (const content of Object.values(fileMap)) {
    if (/require\(['"`]helmet['"`]\)/.test(content) && /app\.use\(helmet/.test(content)) {
      helmetFound = true;
      break;
    }
  }

  if (!helmetFound) {
    findings.push({
      rule: "HELMET_MISSING",
      severity: "high",
      message: "Helmet middleware not found. HTTP security headers are not set.",
      file: null,
    });
  }

  return findings;
};