const db = require("./db");

function saveFindings(projectPath, findings) {
  const scannedAt = new Date().toISOString();

  // calculate quick counts for scan record
  const counts = { critical: 0, high: 0, medium: 0, low: 0 };
  for (const f of findings) {
    const sev = f.severity?.toLowerCase();
    if (counts[sev] !== undefined) counts[sev]++;
  }

  // insert scan record
  const scanInsert = db.prepare(`
    INSERT INTO scans (project_path, scanned_at, total_findings)
    VALUES (?, ?, ?)
  `);
  const scanResult = scanInsert.run(projectPath, scannedAt, findings.length);
  const scanId = scanResult.lastInsertRowid;

  // insert each finding
  const findingInsert = db.prepare(`
    INSERT INTO findings (scan_id, rule, severity, message, file, status)
    VALUES (?, ?, ?, ?, ?, 'open')
  `);

  for (const f of findings) {
    findingInsert.run(scanId, f.rule, f.severity, f.message, f.file || null);
  }

  return scanId;
}

function getAllScans() {
  return db.prepare("SELECT * FROM scans ORDER BY scanned_at DESC").all();
}

function getFindingsByScanId(scanId) {
  return db.prepare("SELECT * FROM findings WHERE scan_id = ?").all(scanId);
}

function updateFindingStatus(findingId, status) {
  const allowed = ["open", "mitigated", "accepted"];
  if (!allowed.includes(status)) throw new Error("Invalid status");
  db.prepare("UPDATE findings SET status = ? WHERE id = ?").run(status, findingId);
  return { success: true };
}

function getMetrics() {
  const totalScans = db.prepare("SELECT COUNT(*) as count FROM scans").get().count;
  const openCritical = db
    .prepare("SELECT COUNT(*) as count FROM findings WHERE severity = 'critical' AND status = 'open'")
    .get().count;
  const openHigh = db
    .prepare("SELECT COUNT(*) as count FROM findings WHERE severity = 'high' AND status = 'open'")
    .get().count;
  const mitigated = db
    .prepare("SELECT COUNT(*) as count FROM findings WHERE status = 'mitigated'")
    .get().count;
  const total = db.prepare("SELECT COUNT(*) as count FROM findings").get().count;

  return { totalScans, openCritical, openHigh, mitigated, total };
}

module.exports = { saveFindings, getAllScans, getFindingsByScanId, updateFindingStatus, getMetrics };