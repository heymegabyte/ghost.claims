import { describe, expect, it } from "vitest";

import { buildHomeAssistantHeaders } from "./home-assistant";
import type { Env } from "../types";

function env(overrides: Partial<Env> = {}): Env {
  return {
    ASSETS: {} as Fetcher,
    HASS_SERVER: "https://connect.tomy.house",
    HASS_TOKEN: "home-assistant-token",
    EMF_SENSOR_ENTITY_ID: "sensor.gq_emf390_emf_mg",
    ...overrides,
  };
}

describe("buildHomeAssistantHeaders", () => {
  it("omits incomplete Access credentials", () => {
    expect(buildHomeAssistantHeaders(env({ HASS_ACCESS_CLIENT_ID: "client-only" }))).toEqual({
      authorization: "Bearer home-assistant-token",
      "content-type": "application/json",
    });
  });

  it("passes a complete Access machine identity to the protected origin", () => {
    expect(buildHomeAssistantHeaders(env({
      HASS_ACCESS_CLIENT_ID: "access-client",
      HASS_ACCESS_CLIENT_SECRET: "access-secret",
    }))).toEqual({
      authorization: "Bearer home-assistant-token",
      "content-type": "application/json",
      "CF-Access-Client-Id": "access-client",
      "CF-Access-Client-Secret": "access-secret",
    });
  });
});
