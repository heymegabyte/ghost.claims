import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import App from "./App";
import { registerThemeToolsElements } from "./theme-tools";

registerThemeToolsElements();

afterEach(() => {
  cleanup();
  window.history.replaceState({}, "", "/blog");
});

describe("Ghost Signal Journal", () => {
  it("renders the canonical theme.tools post grid from structured content", () => {
    window.history.replaceState({}, "", "/blog");
    const { container } = render(<App />);
    expect(screen.getByText("GHOST SIGNAL JOURNAL")).toBeInTheDocument();
    expect(screen.getByText("Stories for the watched.")).toBeInTheDocument();
    expect(container.querySelectorAll(".tt-post")).toHaveLength(5);
    expect(screen.getByRole("link", { name: /Acoustic & Electromagnetic Anomaly Telemetry/i })).toHaveAttribute("href", "/blog/sensor-telemetry-web-dossier");
    expect(screen.getByText(/speculative horror and cultural criticism/i)).toBeInTheDocument();
    expect(screen.getByAltText("Ghost Signal logo")).toHaveAttribute("src", expect.stringContaining("/logo-nav.png"));
    const primaryNavigation = screen.getByRole("navigation", { name: "Primary" });
    expect(primaryNavigation.querySelectorAll("a")).toHaveLength(5);
    expect(primaryNavigation.querySelector('a[href="/blog"]')).toHaveAttribute("aria-current", "page");
  });

  it("integrates the canonical engineering blog post with theme.tools editorial components", () => {
    window.history.replaceState({}, "", "/blog/sensor-telemetry-web-dossier");
    const { container } = render(<App />);
    expect(screen.getByRole("heading", { level: 1, name: /Acoustic & Electromagnetic Anomaly Telemetry/i })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
    expect(screen.getByText(/Hands-on architectural verification/i)).toBeInTheDocument();
    expect(container.querySelector(".tt-toc")).not.toBeNull();
    expect(container.querySelector(".tt-stat-cards")).not.toBeNull();
    expect(container.querySelector(".tt-comparison")).not.toBeNull();
    const unresolvedTokens = [...container.querySelectorAll("p")].filter((paragraph) => /^\{\{(?:widget|figure):[^}]+\}\}$/.test(paragraph.textContent?.trim() ?? ""));
    expect(unresolvedTokens).toHaveLength(0);
  });

  it("renders an article with the canonical web component and reading shell", () => {
    window.history.replaceState({}, "", "/blog/the-clout-war-above-heaven");
    const { container } = render(<App />);
    expect(screen.getByRole("heading", { level: 1, name: "The Clout War Above Heaven" })).toBeInTheDocument();
    expect(container.querySelector("tt-article-reader")?.shadowRoot).not.toBeNull();
    expect(container.querySelector(".tt-article")).not.toBeNull();
  });

  it("renders the Greystone reported memoir with theme.tools research components", () => {
    window.history.replaceState({}, "", "/blog/greystone-after-the-skunk");
    const { container } = render(<App />);
    expect(screen.getByRole("heading", { level: 1, name: "Greystone After the Skunk" })).toBeInTheDocument();
    expect(screen.getByText(/firsthand recollection with public records/i)).toBeInTheDocument();
    expect(container.querySelector(".tt-timeline")).not.toBeNull();
    expect(container.querySelector(".tt-stat-cards")).not.toBeNull();
    expect(container.querySelector(".tt-gallery")).not.toBeNull();
    expect(container.querySelectorAll("[id^='source-']")).toHaveLength(12);
  });

  it("renders the Jungle Habitat field memoir with original photography", () => {
    window.history.replaceState({}, "", "/blog/jungle-habitat-dead-battery-safari-trails");
    const { container } = render(<App />);
    expect(screen.getByRole("heading", { level: 1, name: "Jungle Habitat: The Safari That Killed My Battery" })).toBeInTheDocument();
    expect(screen.getByText(/May 5, 2018 field footage and receipt/i)).toBeInTheDocument();
    expect(container.querySelector(".tt-timeline")).not.toBeNull();
    expect(container.querySelector(".tt-gallery")).not.toBeNull();
    expect(container.querySelectorAll("[id^='jh-source-']")).toHaveLength(9);
    expect(container.querySelectorAll(".night-source-card")).toHaveLength(9);
    expect(screen.getByLabelText("9 references")).toBeInTheDocument();
  });
});
