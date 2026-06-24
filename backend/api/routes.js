const express = require("express");
const router = express.Router();
const { runScan } = require("../scanner/index");
const {
  getAllScans,
  getFindingsByScanId,
  updateFindingStatus,
  getMetrics,
} = require("../tracker/vulnTracker");

// scan a project
router.post("/scan", async (req, res) => {
  const { projectPath } = req.body;
  if (!projectPath) return res.status(400).json({ error: "projectPath is required" });
  try {
    const results = await runScan(projectPath);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get all past scans
router.get("/scans", (req, res) => {
  res.json(getAllScans());
});

// get findings for a specific scan
router.get("/scans/:id/findings", (req, res) => {
  res.json(getFindingsByScanId(req.params.id));
});

// update finding status — open / mitigated / accepted
router.patch("/findings/:id/status", (req, res) => {
  const { status } = req.body;
  try {
    res.json(updateFindingStatus(req.params.id, status));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// dashboard metrics
router.get("/metrics", (req, res) => {
  res.json(getMetrics());
});

// health check
router.get("/health", (req, res) => {
  res.json({ status: "ok", tool: "SecureDevGuardian" });
});

module.exports = router;