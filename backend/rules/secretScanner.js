const SECRET_PATTERNS = [
  { pattern: /AKIA[0-9A-Z]{16}/, label: "AWS Access Key" },
  { pattern: /sk_live_[0-9a-zA-Z]{24,}/, label: "Stripe Live Secret Key" },
  { pattern: /sk_test_[0-9a-zA-Z]{24,}/, label: "Stripe Test Key" },
  { pattern: /mongodb(\+srv)?:\/\/[^'"\s]+/, label: "MongoDB Connection String" },
  { pattern: /ghp_[a-zA-Z0-9]{36}/, label: "GitHub Personal Access Token" },
  { pattern: /-----BEGIN (RSA|EC|OPENSSH) PRIVATE KEY-----/, label: "Private Key" },
  { pattern: /password\s*=\s*['"`][^'"`]{6,}['"`]/i, label: "Hardcoded Password" },
  { pattern: /secret\s*=\s*['"`][^'"`]{6,}['"`]/i, label: "Hardcoded Secret" },
  { pattern: /api[_-]?key\s*[:=]\s*['"`][^'"`]{8,}['"`]/i, label: "API Key" },
];

module.exports = function secretScanner({ fileMap }) {
  const findings = [];

  for (const [filePath, content] of Object.entries(fileMap)) {
    // skip .env.example
    if (filePath.includes(".env.example")) continue;

    for (const { pattern, label } of SECRET_PATTERNS) {
      if (pattern.test(content)) {
        findings.push({
          rule: "HARDCODED_SECRET",
          severity: "critical",
          message: `${label} detected in source file. Remove immediately and rotate the credential.`,
          file: filePath,
        });
      }
    }
  }

  return findings;
};