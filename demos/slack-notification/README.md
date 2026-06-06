# Slack Notification Demo

A small Node.js webhook receiver that sends a Slack notification.

Use this as a starting point for a server-side integration pattern such as:

```text
kintone webhook -> small endpoint -> Slack incoming webhook
```

## Security Boundary

- Slack webhook URL is read from an environment variable.
- Optional shared secret is checked with `x-webhook-token`.
- Request body size is limited.
- No payload is stored.
- Do not commit `.env`.

## Setup

```bash
npm install
cp .env.example .env
npm start
```

Edit `.env`:

```bash
SLACK_WEBHOOK_URL=replace-with-slack-incoming-webhook-url
WEBHOOK_SHARED_SECRET=replace-with-random-secret
PORT=3001
```

## Test Locally

```bash
curl -X POST "http://localhost:3001/webhook" \
  -H "Content-Type: application/json" \
  -H "x-webhook-token: replace-with-random-secret" \
  --data @sample-payload.json
```

## Production Notes

Before production use:

- deploy behind HTTPS,
- rotate webhook URLs if exposed,
- validate the source of webhook requests,
- avoid logging full records,
- keep customer-specific mapping outside public code.
