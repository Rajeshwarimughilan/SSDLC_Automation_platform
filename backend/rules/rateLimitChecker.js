module.exports = function rateLimitChecker({ fileMap, packageJson }) {
  const findings = [];

  const deps = {
    ...packageJson?.dependencies,
    ...packageJson?.devDependencies,
  };

  if (!deps["express-rate-limit"]) {
    findings.push({
      rule: "NO_RATE_LIMITING",
      severity: "medium",
      message:
        "express-rate-limit not found. API is vulnerable to brute force and DoS attacks.",
      file: "package.json",
    });
    return findings;
  }

  let rateLimitUsed = false;
  for (const content of Object.values(fileMap)) {
    if (/rateLimit\(|rateLimiter/.test(content)) {
      rateLimitUsed = true;
      break;
    }
  }

  if (!rateLimitUsed) {
    findings.push({
      rule: "RATE_LIMIT_NOT_APPLIED",
      severity: "medium",
      message: "express-rate-limit is installed but not applied in any route or middleware.",
      file: null,
    });
  }

  return findings;
};