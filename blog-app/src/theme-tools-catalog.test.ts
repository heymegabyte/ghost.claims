import { describe, expect, it } from "vitest";
import { COMPONENT_TYPES, GHOST_THEME_TOOLS_CSS, GHOST_THEME_TOOLS_MANIFEST, renderComponent } from "../../src/theme-tools-catalog";

describe("canonical theme.tools catalog", () => {
  it("ships the complete unified registry and verified modules", () => {
    expect(COMPONENT_TYPES.length).toBeGreaterThanOrEqual(29);
    expect(COMPONENT_TYPES).toContain("article-reader");
    expect(COMPONENT_TYPES).toContain("video-browser");
    expect(GHOST_THEME_TOOLS_CSS).toContain(".tt-widget");
    expect(GHOST_THEME_TOOLS_MANIFEST.modules.site.ok).toBe(true);
    expect(GHOST_THEME_TOOLS_MANIFEST.modules.widgets.ok).toBe(true);
    expect(GHOST_THEME_TOOLS_MANIFEST.modules.media.ok).toBe(true);
  });

  it("dispatches blog content through the unified renderer", () => {
    expect(renderComponent("callout", { variant: "info", title: "Signal", body: "Online" })).toContain("tt-callout");
  });
});
