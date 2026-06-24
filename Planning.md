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


SecureDevGuardian | Node.js, Express.js, Python, React, SQLite, Docker, GitHub Actions

Built a DevSecOps SSDLC automation platform that statically analyzes Node.js/Express.js applications for OWASP-aligned security vulnerabilities across 10 security domains including JWT misconfiguration, CORS policy, authentication gaps, input validation, secret exposure, and dependency vulnerabilities.
Implemented an AST-based static analysis engine using Acorn to parse JavaScript source files and detect insecure coding patterns without executing the target application.
Developed a vulnerability triage and tracking system backed by SQLite that assigns unique IDs, severity levels (Critical/High/Medium/Low), and resolution status to findings, enabling teams to monitor and manage open/mitigated issues over time.
Engineered a risk scoring engine that produces a 0–100 security score with weighted severity calculation across all findings, generating prioritized HTML and JSON security reports.
Containerized the platform using Docker and implemented GitHub Actions CI/CD integration that automatically triggers security scans on every push and fails builds when critical vulnerabilities are detected, enforcing shift-left security practices.
Authored a Python-based secret scanner to detect exposed API keys, AWS credentials, MongoDB URIs, and JWT secrets across source files and environment configurations.

Built an SSDLC automation platform that statically analyzes Node.js apps 
for OWASP vulnerabilities, tracks findings with severity triage, and 
enforces security gates via Docker and GitHub Actions CI/CD.