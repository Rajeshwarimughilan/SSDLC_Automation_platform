const Database = require("better-sqlite3");
const path = require("path");

const DB_PATH = path.join(__dirname, "../../reports/guardian.db");

const db = new Database(DB_PATH);

db.exec(`
  CREATE TABLE IF NOT EXISTS scans (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_path TEXT NOT NULL,
    scanned_at TEXT NOT NULL,
    score INTEGER,
    grade TEXT,
    total_findings INTEGER
  );

  CREATE TABLE IF NOT EXISTS findings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    scan_id INTEGER NOT NULL,
    rule TEXT NOT NULL,
    severity TEXT NOT NULL,
    message TEXT NOT NULL,
    file TEXT,
    status TEXT DEFAULT 'open',
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (scan_id) REFERENCES scans(id)
  );
`);

module.exports = db;