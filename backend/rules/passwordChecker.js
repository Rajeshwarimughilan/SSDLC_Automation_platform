module.exports = function passwordChecker({ fileMap, packageJson }) {
  const findings = [];

  const deps = {
    ...packageJson?.dependencies,
    ...packageJson?.devDependencies,
  };

  const hasHashing = deps["bcrypt"] || deps["bcryptjs"] || deps["argon2"];

  if (!hasHashing) {
    findings.push({
      rule: "NO_PASSWORD_HASHING_LIB",
      severity: "critical",
      message: "No password hashing library found (bcrypt, bcryptjs, argon2).",
      file: "package.json",
    });
  }

  for (const [filePath, content] of Object.entries(fileMap)) {
    // saving password directly from req.body
    if (
      /password\s*:\s*req\.body\.password/.test(content) &&
      !/bcrypt|argon2/.test(content)
    ) {
      findings.push({
        rule: "PLAINTEXT_PASSWORD_STORAGE",
        severity: "critical",
        message: "Password from req.body stored without hashing. Use bcrypt or argon2.",
        file: filePath,
      });
    }
  }

  return findings;
};