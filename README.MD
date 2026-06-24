# SecureDevGuardian

Automated Application Security Assessment Platform for Node.js Applications

SecureDevGuardian is an SSDLC automation platform that statically analyzes 
Express.js applications for OWASP-aligned security misconfigurations before 
deployment. It scans source code, environment files, and dependencies across 
10 security domains, scores overall risk, tracks findings with triage states, 
and integrates with CI/CD pipelines to enforce security gates.

Built as a practical implementation of Application Security Engineering 
concepts including static analysis, vulnerability triage, secure development 
lifecycle automation, and DevSecOps tooling.

## What it checks
- JWT configuration and secret exposure
- Helmet and HTTP security headers
- CORS policy misconfigurations
- Missing authentication and authorization middleware
- Input validation coverage
- Hardcoded secrets and API keys
- Rate limiting presence
- Password hashing practices
- Dependency vulnerabilities via npm audit

## Tech Stack
Backend   — Node.js, Express.js, Acorn (AST), SQLite, better-sqlite3
Frontend  — React, Recharts, Vite
Python    — Secret scanner, report generator
DevOps    — Docker, Docker Compose, GitHub Actions
Reports   — HTML, JSON

## Architecture
Target Project → File Reader → Rule Engine (10 modules) 
→ Risk Scoring → SQLite Tracker → Report Generator → Dashboard