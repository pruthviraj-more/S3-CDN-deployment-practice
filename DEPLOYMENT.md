# Enterprise AWS S3 + CloudFront Frontend CI/CD Guide

This repository contains an automated, enterprise-grade Continuous Integration and Continuous Deployment (CI/CD) pipeline built with GitHub Actions, deploying a React + TypeScript (Vite) application to AWS S3 and CloudFront CDN.

---

## Architecture Overview

```
                      +-------------------+
                      |   GitHub Action   |
                      |   (CI/CD Runner)  |
                      +---------+---------+
                                |
             +------------------+------------------+
             |                                     |
     [1. Sync Assets]                      [2. Invalidate Cache]
             |                                     |
             v                                     v
     +---------------+                     +----------------+
     | AWS S3 Bucket | <--- [OAC Auth] --- | AWS CloudFront | <--- End Users
     | (Private)     |                     | (Global CDN)   |
     +---------------+                     +----------------+
```

### Key Architectural Strengths
1. **Atomic Two-Phase Deployment**:
   - **Hashed Assets (`/assets/*`)**: Uploaded first with a 1-year immutable cache header (`public, max-age=31536000, immutable`). Old assets are cleaned up with `--delete`.
   - **Entrypoint (`index.html`)**: Uploaded last with zero-cache headers (`public, max-age=0, must-revalidate, no-cache`). This completely eliminates white-screen errors caused by cached outdated HTML pointing to new bundle chunks or vice versa.
2. **Global Edge Invalidation**: Triggers an AWS CloudFront invalidation for immediate distribution of updates across global edge points of presence.
3. **Zero Secret Exposure (OIDC)**: Supports AWS OpenID Connect (OIDC) authentication using temporary, auto-expiring AWS STS credentials instead of permanent static IAM credentials.
4. **Isolated Quality Gate**: Enforces static linting (`oxlint`) and automated unit tests (`vitest`) on all Pull Requests and merges prior to triggering deployments.

---

## Required GitHub Secrets

Configure these in **GitHub Repository Settings** -> **Secrets and variables** -> **Actions** (or within a GitHub Environment named `production`):

| Secret Name | Description | Example / Note |
| :--- | :--- | :--- |
| `AWS_S3_BUCKET` | Target AWS S3 Bucket name | `my-frontend-bucket-prod` |
| `CLOUDFRONT_DISTRIBUTION_ID` | CloudFront Distribution ID | `E1A2B3C4D5E6F7` |
| `AWS_REGION` | AWS Region where the S3 bucket lives | `us-east-1` (or `ap-south-1`) |
| `AWS_ROLE_ARN` | *(Recommended)* IAM Role ARN for GitHub OIDC | `arn:aws:iam::123456789012:role/GitHubActionsFrontendDeployRole` |
| `AWS_ACCESS_KEY_ID` | *(Alternative)* Static IAM Access Key ID | Required only if OIDC role is not used |
| `AWS_SECRET_ACCESS_KEY` | *(Alternative)* Static IAM Secret Access Key | Required only if OIDC role is not used |

---

## AWS Setup Guide (Production Standard)

### 1. Minimal Least-Privilege IAM Policy

Attach the following policy to your GitHub Actions IAM Role or IAM User:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "S3BucketAndObjectPermissions",
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:ListBucket",
        "s3:DeleteObject"
      ],
      "Resource": [
        "arn:aws:s3:::<YOUR_BUCKET_NAME>",
        "arn:aws:s3:::<YOUR_BUCKET_NAME>/*"
      ]
    },
    {
      "Sid": "CloudFrontInvalidationPermissions",
      "Effect": "Allow",
      "Action": [
        "cloudfront:CreateInvalidation",
        "cloudfront:GetInvalidation"
      ],
      "Resource": "arn:aws:cloudfront::<YOUR_AWS_ACCOUNT_ID>:distribution/<YOUR_CLOUDFRONT_DISTRIBUTION_ID>"
    }
  ]
}
```

---

### 2. AWS OIDC Trust Policy (Zero-Secret Authentication)

To configure OpenID Connect (OIDC) so GitHub Actions authenticates without permanent access keys:

1. In AWS IAM -> **Identity providers**, add OpenID Connect:
   - **Provider URL**: `https://token.actions.githubusercontent.com`
   - **Audience**: `sts.amazonaws.com`
2. Create an IAM Role with this **Trust Relationship**:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::<YOUR_AWS_ACCOUNT_ID>:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
        },
        "StringLike": {
          "token.actions.githubusercontent.com:sub": "repo:<GITHUB_ORGANIZATION_OR_USERNAME>/<REPOSITORY_NAME>:*"
        }
      }
    }
  ]
}
```

---

### 3. S3 Bucket Security (Origin Access Control - OAC)

1. Keep **Block all public access** enabled on the S3 Bucket (do not make the bucket public).
2. Set up CloudFront with **Origin Access Control (OAC)** to restrict direct S3 traffic.
3. Attach this Bucket Policy to the S3 bucket:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowCloudFrontServicePrincipalReadOnly",
      "Effect": "Allow",
      "Principal": {
        "Service": "cloudfront.amazonaws.com"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::<YOUR_BUCKET_NAME>/*",
      "Condition": {
        "StringEquals": {
          "AWS:SourceArn": "arn:aws:cloudfront::<YOUR_AWS_ACCOUNT_ID>:distribution/<YOUR_CLOUDFRONT_DISTRIBUTION_ID>"
        }
      }
    }
  ]
}
```

---

### 4. CloudFront Single Page Application (SPA) Routing

For client-side routing to work seamlessly without 403/404 errors on browser refresh:

1. In your CloudFront Distribution, navigate to **Error pages** -> **Create custom error response**.
2. Add the following rules:
   - **HTTP error code**: `403: Forbidden`
   - **Response page path**: `/index.html`
   - **HTTP response code**: `200: OK`
3. Add a second custom error response:
   - **HTTP error code**: `404: Not Found`
   - **Response page path**: `/index.html`
   - **HTTP response code**: `200: OK`
