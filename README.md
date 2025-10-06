## Overview [![CI](https://github.com/stuartasiimwe7/cloud-security-monitoring-api/actions/workflows/ci.yml/badge.svg)](https://github.com/stuartasiimwe7/cloud-security-monitoring-api/actions/workflows/ci.yml)

### Background
- Cloud environments generate high-volume, high-velocity activity logs (for example, AWS CloudTrail) across many accounts and regions.
- Security teams struggle to normalise, store, and query these events quickly for incident response, compliance, and threat detection.
- Existing SIEMs can be costly or slow to adapt; many orgs need a focused, API-first way to ingest and surface security-relevant events.

### Task
- Build a lightweight, API-driven service to ingest AWS CloudTrail events, persist security-relevant records, and expose them via standardised endpoints.
- Provide a foundation that can expand to other security sources (IAM, AWS Config) and integrate with dashboards/alerting.
- Keep it developer-friendly (NestJS/TypeScript), operationally simple (PostgreSQL + TypeORM), and secure-by-default.

### Workflow
- Implemented a NestJS service with two main modules:
  - `AwsSecurity`: fetches recent CloudTrail events and persists normalised `security_events` to PostgreSQL; serves APIs to fetch events.
  - `CloudTrail`: accepts event payloads for testing and filters them into `security_events` when matching security criteria (e.g., `ConsoleLogin`, `CreateUser`, `iam` sources).
- Defined normalised entities:
  - `SecurityEvent` (`jsonb` `userIdentity`, `eventDetails`).
  - `CloudTrailEvent` for raw event capture and parity checks.
- Uses AWS SDK v3 to query CloudTrail; TypeORM to persist; `ConfigModule` for environment-based configuration.
- REST endpoints:
  - `GET /aws-security/fetch-events`
  - `GET /aws-security/events`
  - `GET /aws-security/db-events`
  - `POST /cloudtrail/test`
- There's WT auth for non-health endpoints and global validation.
- There's scheduled ingestion (every 10 minutes) to persist CloudTrail events.

### Result
- An API-first security monitoring layer that:
  - Centralizes CloudTrail events in PostgreSQL for fast querying and correlation.
  - Normalises and highlights security-relevant activity for triage and investigations.
  - Provides clear extension points for adding IAM/Config feeds, dashboards, auth, and metrics.
- Expected impact:
  - Faster incident response.
  - Easier compliance evidence since now we have an auditable event store.
  - Lower operational complexity vs. heavy SIEM ingestion for targeted AWS signals.

---

## Quickstart

### Requirements
- Node 18, npm 9+
- PostgreSQL (local or RDS)
- AWS credentials with CloudTrail `LookupEvents`

### Environment
Set env vars (local example):
```bash
export DATABASE_URL="postgres://user:pass@localhost:5432/cloudsec"
export AWS_REGION="us-east-1"
export JWT_SECRET="change_me"
# If not using an instance/profile then :
export AWS_ACCESS_KEY_ID=...
export AWS_SECRET_ACCESS_KEY=...
```

### Run
```bash
npm install
npm run start:dev
```

### Auth and sample calls
```bash
# Get a token
curl -s -X POST http://localhost:3000/auth/dev-token | jq -r .access_token > token.txt

# Ingest recent CloudTrail events to DB
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:3000/aws-security/fetch-events

# Query stored events (DB)
curl -H "Authorization: Bearer $(cat token.txt)" "http://localhost:3000/aws-security/db-events?limit=20&eventSource=signin.amazonaws.com"
```

---

## CI / CD
- CI: installs, lints, builds, and tests (with Postgres) on pull requests.
- CD: optional ECR/ECS workflow.

---
## Features
- **Security Event API**: Fetch security logs from AWS CloudTrail (to be extended for IAM, and Config).
- **Log Storage**: Store logs in PostgreSQL.
- **REST API**: Expose endpoints to fetch security violations.
- **JWT Authentication**: Secure access to the API.

## Tech Stack
- **Backend**: TypeScript + NestJS
- **Cloud SDKs**: AWS SDK (CloudTrail, IAM)
- **Database**: PostgreSQL

## Want to replicate?

Quick curl
```bash
# token
TOKEN=$(curl -s -X POST http://localhost:3000/auth/dev-token | jq -r .access_token)

# ingest
curl -H "Authorization: Bearer $TOKEN" http://localhost:3000/aws-security/fetch-events

# query stored
curl -H "Authorization: Bearer $TOKEN" "http://localhost:3000/aws-security/db-events?limit=20"
```
### Installation

Clone the repository:
```bash
git clone https://github.com/stuartasiimwe7/cloud-security-monitoring-api.git
cd cloud-security-monitoring-api
```
Install dependencies:
```bash
npm install
```
Configure environment variables: Create a `.env` file in the root of the project and add the following:
```plaintext
DATABASE_URL=postgres://user:pass@localhost:5432/cloudsec
AWS_REGION=us-east-1
JWT_SECRET=change_me
# Optional if you are not using an AWS profile/SSO
# AWS_ACCESS_KEY_ID=...
# AWS_SECRET_ACCESS_KEY=...
```
Start the application:
```bash
npm run start
```

## Usage
Get a JWT (dev token):
```bash
POST /auth/dev-token
```
Ingest recent CloudTrail events to the database:
```bash
GET /aws-security/fetch-events
```
Fetch recent events directly from AWS (passthrough):
```bash
GET /aws-security/events
```
Query stored events with filters/pagination:
```bash
GET /aws-security/db-events?limit=20&eventSource=signin.amazonaws.com
```

## Contribution
Contributions are welcome! Please open an [issue](https://github.com/stuartasiimwe7/cloud-security-monitoring-api/issues) or submit a [pull request](https://github.com/stuartasiimwe7/cloud-security-monitoring-api/pulls).

## License
This project is licensed under the [MIT](LICENSE-MIT) and [Apache 2.0](LICENSE-APACHE) License. See the LICENSE files for details.
