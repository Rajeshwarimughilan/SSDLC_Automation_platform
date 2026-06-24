module.exports = function authChecker({ fileMap }) {
  const findings = [];

  const sensitiveRoutePattern =
    /router\.(get|post|put|delete|patch)\s*\(\s*['"`](\/admin|\/dashboard|\/users|\/delete|\/settings)[^'"`)]*['"`]/gi;

  const authMiddlewarePattern = /verifyToken|authenticate|isAuth|requireAuth|authMiddleware|protect/;

  for (const [filePath, content] of Object.entries(fileMap)) {
    const matches = [...content.matchAll(sensitiveRoutePattern)];

    for (const match of matches) {
      const lineStart = content.lastIndexOf("\n", match.index) + 1;
      const lineEnd = content.indexOf("\n", match.index);
      const line = content.slice(lineStart, lineEnd);

      if (!authMiddlewarePattern.test(line)) {
        findings.push({
          rule: "UNPROTECTED_SENSITIVE_ROUTE",
          severity: "critical",
          message: `Sensitive route "${match[0].match(/['"`](\/[^'"`]+)['"`]/)?.[1]}" has no authentication middleware.`,
          file: filePath,
        });
      }
    }
  }

  return findings;
};