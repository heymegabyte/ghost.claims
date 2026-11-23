import type { Env, HistoryPoint, HistoryWindow, NormalizedReading, SnapshotRecord } from "../types";
import { buildDeterministicSensorHistory, deterministicSensorValueAt } from "@theme-tools/shared-utils/sensor-data";

export function isMockSensorMode(env: Env): boolean {
  return env.MOCK_SENSOR_MODE === "1";
}

export function buildMockReading(env: Env, date = new Date()): NormalizedReading {
  const timestamp = date.toISOString();
  const numericValue = deterministicSensorValueAt(date);

  return {
    entityId: env.EMF_SENSOR_ENTITY_ID,
    friendlyName: env.EMF_SENSOR_NAME ?? "Ghost EMF",
    state: numericValue.toFixed(3),
    numericValue,
    unit: "mG",
    lastChanged: timestamp,
    lastUpdated: timestamp,
    source: "home-assistant",
    sampledAt: timestamp,
    cache: {
      maxAgeSeconds: 0,
      staleWhileRevalidateSeconds: 0,
      strategy: "direct-no-store",
    },
  };
}

export function buildMockHistoryPoints(window: HistoryWindow): HistoryPoint[] {
  return buildDeterministicSensorHistory(window);
}

export function buildMockSnapshotRecords(env: Env, window: HistoryWindow): SnapshotRecord[] {
  return buildMockHistoryPoints(window).map((point) => ({
    entityId: env.EMF_SENSOR_ENTITY_ID,
    state: point.value.toFixed(3),
    numericValue: point.value,
    unit: "mG",
    lastChanged: point.timestamp,
    lastUpdated: point.timestamp,
    sampledAt: point.timestamp,
    source: "mock-sensor",
  }));
}
