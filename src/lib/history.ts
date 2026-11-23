import { ApiError } from "./errors";
import type { HistoryPoint, HistoryWindow } from "../types";
import { downsampleNumericPoints } from "@theme-tools/shared-utils/sensor-data";

export function parseHistoryWindow(input: {
  start?: string;
  end?: string;
  minutes?: number;
}): HistoryWindow {
  if (input.start || input.end) {
    if (!input.start || !input.end) {
      throw new ApiError("Both start and end are required when using explicit history ranges.", 400, "VALIDATION_ERROR");
    }

    const start = new Date(input.start);
    const end = new Date(input.end);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      throw new ApiError("History range dates must be valid ISO timestamps.", 400, "VALIDATION_ERROR");
    }

    if (end.getTime() <= start.getTime()) {
      throw new ApiError("History end must be after history start.", 400, "VALIDATION_ERROR");
    }

    const spanHours = (end.getTime() - start.getTime()) / 3_600_000;
    if (spanHours > 24 * 3650) {
      throw new ApiError("History range is too large. Request at most 10 years at a time.", 400, "VALIDATION_ERROR");
    }

    return {
      start: start.toISOString(),
      end: end.toISOString(),
    };
  }

  const minutes = input.minutes ?? 60;
  const end = new Date();
  const start = new Date(end.getTime() - minutes * 60_000);

  return {
    start: start.toISOString(),
    end: end.toISOString(),
  };
}

export function downsamplePoints(points: HistoryPoint[], targetPoints: number): HistoryPoint[] {
  return downsampleNumericPoints(points, targetPoints);
}
