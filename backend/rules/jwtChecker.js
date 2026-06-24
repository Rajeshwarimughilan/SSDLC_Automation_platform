module.exports = function jwtChecker({ fileMap }) {
  const findings = [];

  for (const [filePath, content] of Object.entries(fileMap)) {
    // hardcoded jwt secret
    if (/jwt\.sign\(.*,\s*['"`][a-zA-Z0-9!@#$%^&*]{1,20}['"`]/m.test(content)) {
      findings.push({
        rule: "JWT_HARDCODED_SECRET",
        severity: "critical",
        message: "Hardcoded JWT secret found in source code. Move to .env",
        file: filePath,
      });
    }

    // jwt used but no expiry
    if (/jwt\.sign\(/.test(content) && !/expiresIn/.test(content)) {
      findings.push({
        rule: "JWT_NO_EXPIRY",
        severity: "high",
        message: "JWT token signed without expiresIn option. Tokens never expire.",
        file: filePath,
      });
    }

    // weak algorithm
    if (/algorithm\s*:\s*['"`]HS256['"`]/.test(content)) {
      findings.push({
        rule: "JWT_WEAK_ALGORITHM",
        severity: "medium",
        message: "JWT using HS256. Consider RS256 for production.",
        file: filePath,
      });
    }
  }

  return findings;
};