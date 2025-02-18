## Overview
This project is a Cloud Security Monitoring API built with TypeScript and NestJS. It fetches security logs from AWS CloudTrail, IAM, and Config, and stores them in PostgreSQL. The API exposes endpoints for retrieving security violations and includes JWT authentication for secure access. Additionally, it features a Grafana dashboard for cloud security analytics.

## Features
- **Security Event API**: Fetch security logs from AWS CloudTrail, IAM, and Config.
- **Log Storage**: Store logs in PostgreSQL (or MongoDB).
- **REST API**: Expose endpoints to fetch security violations.
- **Analytics Dashboard**: Visualize security events using Grafana.
- **JWT Authentication**: Secure access to the API.

## Tech Stack
- **Backend**: TypeScript + NestJS
- **Cloud SDKs**: AWS SDK (CloudTrail, IAM)
- **Database**: PostgreSQL
- **Logging**: Prometheus + Grafana

## Installation
Clone the repository:
```bash
git clone https://github.com/yourusername/cloud-security-monitoring-api.git
cd cloud-security-monitoring-api
```
Install dependencies:
```bash
npm install
```
Configure environment variables: Create a `.env` file in the root of the project and add the following:
```plaintext
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```
Start the application:
```bash
npm run start
```

## Usage
Fetch CloudTrail Logs:
```bash
GET /security-logs/cloudtrail
```
Fetch IAM Logs:
```bash
GET /security-logs/iam
```
Fetch Config Logs:
```bash
GET /security-logs/config
```

## Contribution
Contributions are welcome! Please open an [issue](https://github.com/stuartasiimwe7/cloud-security-monitoring-api/issues) or submit a [pull request](https://github.com/stuartasiimwe7/cloud-security-monitoring-api/pulls).

## License
This project is licensed under the [MIT](LICENSE-MIT) and [Apache 2.0](LICENSE-APACHE) License. See the LICENSE files for details.
