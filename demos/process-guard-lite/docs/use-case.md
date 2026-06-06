# Use Case

## Scenario

A team manages requests in kintone.

Before a request moves from `Draft` to `In Review`, the team wants to make sure:

- title is filled,
- owner is assigned,
- due date is visible,
- approval note is added before approval.

## Example Field Codes

| Meaning | Placeholder field code |
| --- | --- |
| Status | `status` |
| Due date | `due_date` |
| Title | `title` |
| Owner | `owner` |
| Approval note | `approval_note` |

## Example Rules

| Status | Required fields |
| --- | --- |
| Draft | `title`, `owner` |
| In Review | `title`, `owner`, `approval_note` |
| Approved | `title`, `owner`, `approval_note` |

## Expected Behavior

- On record show/edit/create, warnings appear in the header area.
- On save, missing fields block the save.
- On process action, missing fields for the next status block the action.
- If due date is before today and the record is not in a final status, an overdue warning is shown.

## Notes

This demo intentionally avoids external requests. If Slack or API integration is needed, keep it in a separate server-side or webhook component.
