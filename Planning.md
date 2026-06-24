Phase 1 — Project scaffold + core scanner engine (Week 1)

Phase 2 — Security rule modules, 6 core ones (Week 2)

Phase 3 — Risk engine + SQLite vuln tracker (Week 3)

Phase 4 — Report generator HTML + JSON (Week 4)

Phase 5 — React dashboard (Week 5)

Phase 6 — Docker + GitHub Actions CI gate (Week 6)

Phase 7 — Python secret scanner + polish + README (Week 7)

SecureDevGuardian/
├── backend/
│   ├── scanner/
│   │   ├── index.js              # main scanner orchestrator
│   │   └── fileReader.js         # reads target project files
│   ├── rules/
│   │   ├── jwtChecker.js
│   │   ├── helmetChecker.js
│   │   ├── corsChecker.js
│   │   ├── authChecker.js
│   │   ├── validationChecker.js
│   │   ├── secretScanner.js
│   │   ├── rateLimitChecker.js
│   │   ├── passwordChecker.js
│   │   ├── headersChecker.js
│   │   └── dependencyChecker.js
│   ├── risk/
│   │   └── riskEngine.js         # scoring logic
│   ├── tracker/
│   │   ├── db.js                 # SQLite connection
│   │   └── vulnTracker.js        # triage CRUD
│   ├── report/
│   │   ├── htmlReport.js
│   │   └── jsonReport.js
│   ├── api/
│   │   └── routes.js             # Express API for dashboard
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ScanResults.jsx
│   │   │   ├── VulnTracker.jsx
│   │   │   └── MetricsChart.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
├── python/
│   ├── secret_scanner.py
│   └── report_generator.py
├── sample-vulnerable-app/        # test target you'll scan
│   ├── app.js
│   ├── routes/
│   └── package.json
├── reports/                      # generated output lands here
├── .github/
│   └── workflows/
│       └── security-scan.yml
├── docker/
│   ├── Dockerfile
│   └── docker-compose.yml
├── .env.example
├── .gitignore
└── README.md