const SEVERITY_WEIGHTS = {
  critical: 40,
  high: 15,
  medium: 8,
  low: 3,
};

function calculateRisk(findings) {
  const counts = { critical: 0, high: 0, medium: 0, low: 0 };

  for (const finding of findings) {
    const sev = finding.severity?.toLowerCase();
    if (counts[sev] !== undefined) counts[sev]++;
  }

  const totalDeduction =
    counts.critical * SEVERITY_WEIGHTS.critical +
    counts.high * SEVERITY_WEIGHTS.high +
    counts.medium * SEVERITY_WEIGHTS.medium +
    counts.low * SEVERITY_WEIGHTS.low;

  const score = Math.max(0, 100 - totalDeduction);

  let grade;
  if (score >= 90) grade = "A";
  else if (score >= 75) grade = "B";
  else if (score >= 60) grade = "C";
  else if (score >= 40) grade = "D";
  else grade = "F";

  return {
    score,
    grade,
    counts,
    summary: buildSummary(counts, score, grade),
  };
}

function buildSummary(counts, score, grade) {
  return `Security Score: ${score}/100 (${grade}) — Critical: ${counts.critical}, High: ${counts.high}, Medium: ${counts.medium}, Low: ${counts.low}`;
}

module.exports = { calculateRisk };