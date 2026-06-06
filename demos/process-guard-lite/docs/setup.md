# Setup

## 1. Prepare A Sandbox App

Do not test this first in a production app.

Create a sandbox kintone app with fields matching the placeholders, or update `src/config.js` to match your app.

## 2. Update Field Codes

Open `src/config.js` and replace:

- `status`
- `due_date`
- `title`
- `owner`
- `approval_note`

Use field codes, not field labels.

## 3. Upload JavaScript Files

In kintone app settings:

1. Open JavaScript / CSS customization.
2. Upload `src/config.js`.
3. Upload `src/index.js`.
4. Save settings.
5. Update the app.

`src/config.js` must be loaded before `src/index.js`.

## 4. Test Cases

- Create record with missing title.
- Edit record with missing owner.
- Set due date to yesterday.
- Try process action into `In Review` without approval note.
- Move a record to a final status and confirm overdue warning no longer appears.

## 5. Production Review Checklist

- Field codes are correct.
- Process statuses match actual values.
- Required field rules match business rules.
- Error messages are understandable for users.
- No sensitive data is logged.
- Rollback steps are documented.
