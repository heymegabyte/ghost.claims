import { getSiteUrl } from "./config";
import { ApiError } from "./errors";
import type { Env, HistoryWindow, SnapshotRecord } from "../types";
import { buildSensorSnapshotFilename } from "@theme-tools/shared-utils/sensor-data";
export {
  buildSensorSnapshotCsv as buildSnapshotCsv,
  buildSensorSnapshotExcel as buildSnapshotExcel,
  deriveSensorSnapshotRandom as deriveSnapshotRandom,
} from "@theme-tools/shared-utils/sensor-data";

function requireSnapshotDb(env: Env): D1Database {
  if (!env.EMF_DB) {
    throw new ApiError(
      "Serverless snapshot storage is not configured. Bind EMF_DB to enable exports and reproducible random numbers.",
      503,
      "SNAPSHOT_STORAGE_UNAVAILABLE",
    );
  }

  return env.EMF_DB;
}

export async function fetchSnapshotRecords(env: Env, window: HistoryWindow): Promise<SnapshotRecord[]> {
  const db = requireSnapshotDb(env);
  const result = await db
    .prepare(
      `
        SELECT
          entity_id AS entityId,
          state,
          numeric_value AS numericValue,
          unit,
          last_changed AS lastChanged,
          last_updated AS lastUpdated,
          sampled_at AS sampledAt,
          source
        FROM emf_snapshots
        WHERE entity_id = ?1
          AND sampled_at >= ?2
          AND sampled_at <= ?3
        ORDER BY sampled_at ASC
      `,
    )
    .bind(env.EMF_SENSOR_ENTITY_ID, window.start, window.end)
    .all<SnapshotRecord>();

  return (result.results ?? []).map((row) => ({
    entityId: row.entityId,
    state: row.state,
    numericValue: row.numericValue,
    unit: row.unit ?? null,
    lastChanged: row.lastChanged,
    lastUpdated: row.lastUpdated,
    sampledAt: row.sampledAt,
    source: row.source,
  }));
}

export function buildSnapshotFilename(window: HistoryWindow, format: "csv" | "excel"): string {
  return buildSensorSnapshotFilename(window, format, "ghost-emf");
}

export function buildSnapshotExportUrl(env: Env, window: HistoryWindow, format: "csv" | "excel" = "csv"): string {
  const url = new URL("/api/v1/ghost-emf/export", getSiteUrl(env));
  url.searchParams.set("start", window.start);
  url.searchParams.set("end", window.end);
  url.searchParams.set("format", format);
  return url.toString();
}

export function buildGoogleSheetsFormula(env: Env, window: HistoryWindow): string {
  return `=IMPORTDATA("${buildSnapshotExportUrl(env, window, "csv")}")`;
}
