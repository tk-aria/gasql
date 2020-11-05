// src/main.ts

export function doGet(): GoogleAppsScript.Content.TextOutput {
  return ContentService.createTextOutput("Hello World");
}

export function doPost(): GoogleAppsScript.Content.TextOutput {
  const data = {
    method: "hiogehoge",
    response_type: "ephemeral",
  };

  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON
  );
}
