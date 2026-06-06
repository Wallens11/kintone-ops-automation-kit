# Process Guard Lite

A small kintone JavaScript customization demo that helps prevent workflow mistakes.

It shows warnings and blocks risky actions when required fields are missing or when a due date is overdue.

## Problem

Many teams use process status as a checklist, but mistakes still happen:

- required fields are missing,
- records move to the next status too early,
- overdue tasks are not visible enough,
- users depend on manual checking.

This demo makes those issues visible before save or process action.

## Features

- Shows warning messages on create, edit, and detail screens.
- Requires different fields depending on status.
- Blocks save when required fields are missing.
- Blocks process action when target-status requirements are not met.
- Shows overdue warnings based on a date field.
- Uses placeholder field codes only.
- No external server.
- No secret keys.
- No customer data.

## Files

```text
src/config.js
src/index.js
docs/use-case.md
docs/setup.md
```

## Setup

1. Create or open a sandbox kintone app.
2. Add fields that match the placeholders in `src/config.js`, or update the field codes.
3. Upload `src/config.js` and `src/index.js` as JavaScript customization files.
4. Test create, edit, save, and process action behavior.

See `docs/setup.md` for more detail.

## Customization Points

Edit `src/config.js`:

- `STATUS_FIELD_CODE`
- `DUE_DATE_FIELD_CODE`
- `FINAL_STATUSES`
- `STATUS_REQUIREMENTS`

## Production Disclaimer

This is a demo. Review field codes, process-management rules, permissions, error wording, browser support, and rollback plan before using it in production.
