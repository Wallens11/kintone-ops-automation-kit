# Kintone Ops Automation Kit

Small workflow automation demos and service materials for teams using kintone, Slack, Google Sheets, CSV files, and manual admin workflows.

This repository is a public-safe starter kit. It contains demo code, offer documents, landing page copy, and outreach templates for small scoped automation work. It does not include customer data, API tokens, secrets, internal screenshots, or production credentials.

This project is not affiliated with, sponsored by, or endorsed by Cybozu, Inc. Product names are used only to describe compatible workflow patterns.

## 日本語

このリポジトリは、kintone、Slack、Google Sheets、CSV、手作業の事務フローを対象にした小規模な業務自動化デモ集です。

主な対象は、次のような小さく切り出せる改善です。

- kintone のステータスや入力値に応じた保存前チェック
- kintone のステータス変更をきっかけにした Slack 通知
- 期限超過タスクのリマインド
- CSV インポート前のデータ整形
- 週次レポート作成の下準備

大規模な基幹システム導入を一人で請け負うためのものではありません。現場の小さな詰まりを見つけ、既存ツールの範囲で安全に改善するためのスターターキットです。

## English

This repo contains lightweight workflow automation demos for kintone, Slack, Google Sheets, CSV cleanup, reminders, and reporting support.

It is intended as:

- a technical portfolio,
- a demo kit for potential clients,
- a base for small kintone customization or integration projects,
- a sales support asset for outreach to Japanese kintone partners and SMB teams.

## Demo Projects

| Demo | Purpose | External service |
| --- | --- | --- |
| `demos/process-guard-lite` | Warns users and blocks risky saves/process actions based on status, required fields, and due dates. | None |
| `demos/slack-notification` | Receives a webhook payload and sends a Slack message. | Slack webhook, only when configured |
| `demos/csv-cleanup-helper` | Cleans CSV files before import by trimming values and validating required columns. | None |

## Repository Structure

```text
.
├── README.md
├── docs/
│   ├── offer-ja.md
│   ├── offer-id.md
│   ├── case-study-template.md
│   ├── github-profile-readme-draft.md
│   ├── outbound-templates.md
│   └── side-income-execution-plan.md
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

## AI Usage

Initial drafts and repository structure were AI-assisted, then reviewed and constrained around a small, public-safe MVP. Any production client implementation should be manually reviewed, tested, and adapted to the client's actual workflow.
