import http from "node:http";

const PORT = Number(process.env.PORT || 3001);
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;
const WEBHOOK_SHARED_SECRET = process.env.WEBHOOK_SHARED_SECRET;
const MAX_BODY_BYTES = 1024 * 128;

function readJsonBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk;

      if (Buffer.byteLength(body) > MAX_BODY_BYTES) {
        reject(new Error("Request body is too large."));
        request.destroy();
      }
    });

    request.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error("Invalid JSON body."));
      }
    });

    request.on("error", reject);
  });
}

function fieldValue(record, fieldCode) {
  return record?.[fieldCode]?.value || "";
}

function buildSlackMessage(payload) {
  const appName = payload.app?.name || `App ${payload.app?.id || "unknown"}`;
  const record = payload.record || {};
  const recordId = fieldValue(record, "$id") || "unknown";
  const title = fieldValue(record, "title") || "(no title)";
  const status = fieldValue(record, "status") || "(no status)";

  return {
    text: `[${appName}] ${payload.type || "KINTONE_EVENT"}: #${recordId} ${title} -> ${status}`
  };
}

async function sendSlackMessage(message) {
  if (!SLACK_WEBHOOK_URL) {
    throw new Error("SLACK_WEBHOOK_URL is not configured.");
  }

  const response = await fetch(SLACK_WEBHOOK_URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(message)
  });

  if (!response.ok) {
    throw new Error(`Slack request failed with status ${response.status}.`);
  }
}

function isAuthorized(request) {
  if (!WEBHOOK_SHARED_SECRET) {
    return true;
  }

  return request.headers["x-webhook-token"] === WEBHOOK_SHARED_SECRET;
}

function sendJson(response, statusCode, body) {
  response.writeHead(statusCode, { "content-type": "application/json" });
  response.end(JSON.stringify(body));
}

const server = http.createServer(async (request, response) => {
  if (request.method !== "POST" || request.url !== "/webhook") {
    sendJson(response, 404, { error: "Not found" });
    return;
  }

  if (!isAuthorized(request)) {
    sendJson(response, 401, { error: "Unauthorized" });
    return;
  }

  try {
    const payload = await readJsonBody(request);
    const message = buildSlackMessage(payload);

    await sendSlackMessage(message);

    sendJson(response, 200, { ok: true });
  } catch (error) {
    sendJson(response, 400, { error: error.message });
  }
});

server.listen(PORT, () => {
  console.log(`Slack notification demo listening on http://localhost:${PORT}/webhook`);
});
