const express = require("express");
const router = express.Router();
const { runScan } = require("../scanner/index");

router.post("/scan", async (req, res) => {
  const { projectPath } = req.body;

  if (!projectPath) {
    return res.status(400).json({ error: "projectPath is required" });
  }

  try {
    const results = await runScan(projectPath);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/health", (req, res) => {
  res.json({ status: "ok", tool: "SecureDevGuardian" });
});

module.exports = router;