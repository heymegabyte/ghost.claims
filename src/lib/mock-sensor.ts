import type { Env, HistoryPoint, HistoryWindow, NormalizedReading, SnapshotRecord } from "../types";

function getDeterministicValueAt(date: Date): number {
  const minutes = Math.floor(date.getTime() / 60_000);
  const waveA = Math.sin(minutes / 11) * 0.22;
  const waveB = Math.cos(minutes / 37) * 0.17;
  const waveC = Math.sin(minutes / 5) * 0.08;
  return Number((0.82 + waveA + waveB + waveC).toFixed(3));
}

export function isMockSensorMode(env: Env): boolean {
  return env.MOCK_SENSOR_MODE === "1";
}

export function buildMockReading(env: Env, date = new Date()): NormalizedReading {
  const timestamp = date.toISOString();
  const numericValue = getDeterministicValueAt(date);

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
  const start = new Date(window.start);
  const end = new Date(window.end);
  const points: HistoryPoint[] = [];

  for (let cursor = start.getTime(); cursor <= end.getTime(); cursor += 60_000) {
    const date = new Date(cursor);
    points.push({
      timestamp: date.toISOString(),
      value: getDeterministicValueAt(date),
    });
  }

  return points;
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
