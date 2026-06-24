module.exports = function validationChecker({ fileMap, packageJson }) {
  const findings = [];

  const deps = {
    ...packageJson?.dependencies,
    ...packageJson?.devDependencies,
  };

  const hasValidator =
    deps["express-validator"] || deps["joi"] || deps["zod"] || deps["yup"];

  if (!hasValidator) {
    findings.push({
      rule: "NO_INPUT_VALIDATION_LIB",
      severity: "high",
      message:
        "No input validation library found (express-validator, joi, zod). User input is unvalidated.",
      file: "package.json",
    });
  }

  for (const [filePath, content] of Object.entries(fileMap)) {
    // direct use of req.body without validation
    if (/req\.body\.\w+/.test(content) && !hasValidator) {
      findings.push({
        rule: "UNVALIDATED_INPUT",
        severity: "medium",
        message: "req.body fields used without validation library present.",
        file: filePath,
      });
      break; // one finding per project is enough for this
    }
  }

  return findings;
};