(function () {
  "use strict";

  window.ProcessGuardLiteConfig = {
    // TODO: Replace these placeholder field codes with your own kintone app field codes.
    STATUS_FIELD_CODE: "status",
    DUE_DATE_FIELD_CODE: "due_date",
    TITLE_FIELD_CODE: "title",
    OWNER_FIELD_CODE: "owner",
    APPROVAL_NOTE_FIELD_CODE: "approval_note",

    // Records in these statuses are not treated as overdue.
    FINAL_STATUSES: ["Done", "Closed"],

    // Required fields can change depending on the current or next status.
    STATUS_REQUIREMENTS: {
      Draft: ["title", "owner"],
      "In Review": ["title", "owner", "approval_note"],
      Approved: ["title", "owner", "approval_note"]
    },

    WARNING_CONTAINER_ID: "process-guard-lite-warning"
  };
})();
