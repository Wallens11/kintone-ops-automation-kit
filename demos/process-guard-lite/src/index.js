(function () {
  "use strict";

  var config = window.ProcessGuardLiteConfig;

  if (!config) {
    throw new Error("ProcessGuardLiteConfig is missing. Load src/config.js before src/index.js.");
  }

  var SHOW_EVENTS = [
    "app.record.create.show",
    "app.record.edit.show",
    "app.record.detail.show"
  ];

  var SUBMIT_EVENTS = [
    "app.record.create.submit",
    "app.record.edit.submit"
  ];

  function getFieldValue(record, fieldCode) {
    if (!record || !fieldCode || !record[fieldCode]) {
      return "";
    }

    return record[fieldCode].value;
  }

  function getCurrentStatus(record) {
    return getFieldValue(record, config.STATUS_FIELD_CODE) || getFieldValue(record, "$status") || "Draft";
  }

  function isEmpty(value) {
    if (value === null || value === undefined) {
      return true;
    }

    if (Array.isArray(value)) {
      return value.length === 0;
    }

    if (typeof value === "string") {
      return value.trim() === "";
    }

    return false;
  }

  function getMissingRequiredFields(record, status) {
    var requiredFields = config.STATUS_REQUIREMENTS[status] || [];

    return requiredFields.filter(function (fieldCode) {
      return isEmpty(getFieldValue(record, fieldCode));
    });
  }

  function parseDateOnly(value) {
    if (!value || typeof value !== "string") {
      return null;
    }

    var date = new Date(value + "T00:00:00");
    return Number.isNaN(date.getTime()) ? null : date;
  }

  function todayDateOnly() {
    var now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }

  function isOverdue(record, status) {
    if (config.FINAL_STATUSES.indexOf(status) >= 0) {
      return false;
    }

    var dueDate = parseDateOnly(getFieldValue(record, config.DUE_DATE_FIELD_CODE));
    if (!dueDate) {
      return false;
    }

    return dueDate < todayDateOnly();
  }

  function buildMessages(record, status) {
    var messages = [];
    var missingFields = getMissingRequiredFields(record, status);

    if (missingFields.length > 0) {
      messages.push("Missing required fields for status '" + status + "': " + missingFields.join(", "));
    }

    if (isOverdue(record, status)) {
      messages.push("This record is overdue. Please confirm the due date or move it to a final status.");
    }

    return messages;
  }

  function clearFieldErrors(record) {
    Object.keys(record).forEach(function (fieldCode) {
      if (record[fieldCode] && Object.prototype.hasOwnProperty.call(record[fieldCode], "error")) {
        record[fieldCode].error = null;
      }
    });
  }

  function setFieldErrors(record, fieldCodes) {
    fieldCodes.forEach(function (fieldCode) {
      if (record[fieldCode]) {
        record[fieldCode].error = "Required for this status.";
      }
    });
  }

  function renderWarning(messages) {
    var space = kintone.app.record.getHeaderMenuSpaceElement();
    if (!space) {
      return;
    }

    var existing = document.getElementById(config.WARNING_CONTAINER_ID);
    if (existing) {
      existing.remove();
    }

    if (messages.length === 0) {
      return;
    }

    var container = document.createElement("div");
    container.id = config.WARNING_CONTAINER_ID;
    container.style.margin = "12px 0";
    container.style.padding = "12px 14px";
    container.style.border = "1px solid #d97706";
    container.style.background = "#fff7ed";
    container.style.color = "#7c2d12";
    container.style.fontSize = "14px";
    container.style.lineHeight = "1.6";

    var title = document.createElement("strong");
    title.textContent = "Process Guard Lite";
    container.appendChild(title);

    var list = document.createElement("ul");
    list.style.margin = "8px 0 0";
    list.style.paddingLeft = "20px";

    messages.forEach(function (message) {
      var item = document.createElement("li");
      item.textContent = message;
      list.appendChild(item);
    });

    container.appendChild(list);
    space.appendChild(container);
  }

  function validateEvent(event, status) {
    var record = event.record;
    var missingFields = getMissingRequiredFields(record, status);
    var messages = buildMessages(record, status);

    clearFieldErrors(record);
    setFieldErrors(record, missingFields);

    if (messages.length > 0) {
      event.error = messages.join("\n");
    }

    return event;
  }

  kintone.events.on(SHOW_EVENTS, function (event) {
    var status = getCurrentStatus(event.record);
    renderWarning(buildMessages(event.record, status));
    return event;
  });

  kintone.events.on(SUBMIT_EVENTS, function (event) {
    var status = getCurrentStatus(event.record);
    return validateEvent(event, status);
  });

  kintone.events.on("app.record.detail.process.proceed", function (event) {
    var nextStatus = event.nextStatus && event.nextStatus.value
      ? event.nextStatus.value
      : getCurrentStatus(event.record);

    return validateEvent(event, nextStatus);
  });
})();
