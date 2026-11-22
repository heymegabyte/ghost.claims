import fs from "node:fs/promises";
import { expect } from "@playwright/test";

export const SEEDED_FULL_RANGE = {
  start: "2026-03-20T00:00:00.000Z",
  end: "2026-04-23T23:59:00.000Z",
};

export const SEEDED_CUSTOM_RANGE = {
  start: "2026-04-10T02:00:00.000Z",
  end: "2026-04-10T08:00:00.000Z",
};

export const SEEDED_ALT_RANGE = {
  start: "2026-04-12T01:00:00.000Z",
  end: "2026-04-12T05:30:00.000Z",
};

export function buildRangeQuery(range) {
  const params = new URLSearchParams({
    start: range.start,
    end: range.end,
  });
  return params.toString();
}

export async function resetSnapshots(request) {
  const response = await request.get("/__test/reset");
  expect(response.ok()).toBeTruthy();
}

export async function seedSnapshots(request, range = SEEDED_FULL_RANGE) {
  const response = await request.get(`/__test/seed?reset=1&${buildRangeQuery(range)}`);
  expect(response.ok()).toBeTruthy();
  return response.json();
}

export async function seedWithoutReset(request, range) {
  const response = await request.get(`/__test/seed?${buildRangeQuery(range)}`);
  expect(response.ok()).toBeTruthy();
  return response.json();
}

export async function gotoHome(page, range = SEEDED_CUSTOM_RANGE) {
  await page.goto(`/?${buildRangeQuery(range)}`);
  await waitForHomepageReady(page);
}

export async function waitForHomepageReady(page) {
  await expect(page.locator("#current-value")).not.toHaveText("--");
  await expect(page.locator("#chart-meta")).not.toContainText("Loading");
  await expect(page.locator("#random-number")).not.toHaveText("--");
  await expect(page.locator("#sheets-formula")).toContainText("IMPORTDATA");
}

export async function waitForTimelineReady(page) {
  await expect(page.locator("#timeline-track")).not.toBeEmpty();
  await expect.poll(() => page.locator(".tl-item").count()).toBeGreaterThan(0);
}

export function trackConsoleErrors(page) {
  const errors = [];
  page.on("console", (message) => {
    if (message.type() === "error") {
      errors.push(message.text());
    }
  });
  page.on("pageerror", (error) => {
    errors.push(error.message);
  });
  return errors;
}

export function expectNoConsoleErrors(errors) {
  expect(errors, errors.join("\n")).toEqual([]);
}

export async function readDownload(download) {
  const filePath = await download.path();
  expect(filePath).toBeTruthy();
  return fs.readFile(filePath, "utf8");
}

export function countCsvRows(csvText) {
  return csvText.trim().split(/\r?\n/).length;
}

export function isoToLocalInput(isoString) {
  const date = new Date(isoString);
  const offsetMs = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offsetMs).toISOString().slice(0, 16);
}

export async function getJson(request, path) {
  const response = await request.get(path);
  expect(response.ok()).toBeTruthy();
  return response.json();
}

export async function expectVisibleText(locator, text) {
  await expect(locator).toContainText(text);
}
