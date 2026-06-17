# Kintone Ops Automation Kit

Small workflow automation demos and service materials for Japanese companies and Japanese kintone partners using kintone, Slack, Google Sheets, CSV files, and manual admin workflows.

This repository is a public-safe portfolio kit. It contains small demo code and service documents for scoped automation work in the Japanese market. It does not include customer data, API tokens, secrets, internal screenshots, or production credentials.

This project is not affiliated with, sponsored by, or endorsed by Cybozu, Inc. Product names are used only to describe compatible workflow patterns.

## 日本語

このリポジトリは、日本国内の企業・kintone 支援会社向けに、kintone、Slack、Google Sheets、CSV、手作業の事務フローを対象にした小規模な業務自動化デモ集です。

主な対象は、次のような小さく切り出せる改善です。

- kintone のステータスや入力値に応じた保存前チェック
- kintone のステータス変更をきっかけにした Slack 通知
- 期限超過タスクのリマインド
- CSV インポート前のデータ整形
- 週次レポート作成の下準備

大規模な基幹システム導入を一人で請け負うためのものではありません。現場の小さな詰まりを見つけ、既存ツールの範囲で安全に改善するためのスターターキットです。

## What This Demonstrates

This repo is intentionally small. It shows practical judgment in the type of work that often appears around kintone operations:

- status-based validation and process-action guardrails,
- placeholder-driven kintone JavaScript customization,
- server-side Slack webhook handling with environment variables,
- CSV cleanup before import,
- public-safe documentation,
- clear separation between demo assumptions and production client work.

It is not a claim of official Cybozu partner status, enterprise delivery capacity, or production readiness without client-specific review.

## English

This repo contains lightweight workflow automation demos for Japanese companies and Japanese kintone partners working with kintone, Slack, Google Sheets, CSV cleanup, reminders, and reporting support.

It is intended as:

- a technical portfolio,
- a demo kit for potential clients,
- a base for small kintone customization or integration projects,
- a sales support asset for outreach to Japanese kintone partners and Japanese SMB teams.

## Demo Projects

| Demo | Purpose | External service |
| --- | --- | --- |
| `demos/process-guard-lite` | Warns users and blocks risky saves/process actions based on status, required fields, and due dates. | None |
| `demos/slack-notification` | Receives a webhook payload and sends a Slack message. | Slack webhook, only when configured |
| `demos/csv-cleanup-helper` | Cleans CSV files before import by trimming values and validating required columns. | None |

## Current Verification

The current demo checks were run locally:

```bash
cd demos/slack-notification && npm run check
cd demos/csv-cleanup-helper && npm run check
cd demos/csv-cleanup-helper && npm test
cd demos/process-guard-lite && node --check src/config.js
cd demos/process-guard-lite && node --check src/index.js
```

These checks validate syntax and the CSV sample flow. The kintone customization still needs sandbox testing against the target app field codes before production use.

## Repository Structure

```text
.
├── README.md
├── docs/
│   ├── offer-ja.md
│   ├── offer-id.md
│   └── case-study-template.md
├── demos/
│   ├── process-guard-lite/
│   ├── slack-notification/
│   └── csv-cleanup-helper/
├── landing/
│   └── index.md
└── .github/
    └── ISSUE_TEMPLATE/
```

## Security Boundary

- No real customer data.
- No API tokens or secrets.
- No `.env` file is committed.
- No customer screenshots or internal workflow exports.
- Demo field codes are placeholders and must be reviewed before production use.
- Slack demo uses environment variables and rejects requests when validation fails.

## Local Setup

There is no root application to install. Open each demo folder and follow its README.

```bash
cd demos/slack-notification
npm install
npm start

cd ../csv-cleanup-helper
npm install
npm test
```

The kintone customization demo is plain browser JavaScript and does not require a build step.

## Implementation Notes

The demos are intentionally small. They prioritize readable logic, safe defaults, and easy customization over generic frameworks.

Before using any demo in production:

- replace placeholder field codes,
- test in a kintone sandbox app,
- review permissions and process-management rules,
- confirm logging does not expose sensitive data,
- document client-specific assumptions outside this public repo.

## Limitations

- Field codes, status names, and Slack message mapping are placeholders.
- The kintone demo should be tested in a sandbox app before any production rollout.
- The Slack demo does not persist payloads and is not a full integration platform.
- The CSV helper is for small controlled imports, not large-scale data migration.
- Client-specific requirements, permissions, and rollback steps should be documented outside this public repo.

## Public Review Notes

- The demos are intentionally small and use placeholder field codes.
- No customer data, secrets, internal screenshots, or production credentials are included.
- Real client work should be reviewed, tested, and adapted to the actual workflow before production use.
