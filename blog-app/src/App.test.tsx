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
    expect(screen.getByRole("button", { name: "Browse" })).toBeInTheDocument();
    expect(container.querySelectorAll(".tt-nav__links > .tt-nav__link")).toHaveLength(0);
    expect(container.querySelector(".tt-nav__ov-search")).not.toBeInTheDocument();
    expect(container.querySelectorAll(".tt-ov__card")).toHaveLength(5);
    expect(container.querySelector('.tt-ov__card[href="/story"]')).toHaveTextContent("Story");
    expect(container.querySelector('.tt-ov__card[href="/plates"]')).toHaveTextContent("Plates");
    expect(container.querySelector('.tt-ov__card[href="/blog"]')).toHaveAttribute("aria-current", "page");
    expect(container.querySelector(".tt-nav__account")).not.toBeInTheDocument();
  });

  it("renders article references through the canonical theme.tools source library", () => {
    window.history.replaceState({}, "", "/blog/greystone-after-the-skunk");
    const { container } = render(<App />);
    expect(container.querySelector(".tt-sources")).toBeInTheDocument();
    expect(container.querySelectorAll(".tt-source-card").length).toBeGreaterThan(5);
    expect(container.querySelector(".night-sources")).not.toBeInTheDocument();
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

  it("keeps the journal canvas and technical article shell transparent", () => {
    window.history.replaceState({}, "", "/blog/sensor-telemetry-web-dossier");
    const { container } = render(<App />);
    expect(container.querySelector("#main")).toHaveClass("tt-journal");
    expect(container.querySelector(".journal-technical-article")).toBeInTheDocument();
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
    const videos = container.querySelectorAll<HTMLVideoElement>(".journal-field-video video");
    expect(videos).toHaveLength(2);
    expect(videos[0]).toHaveAttribute("preload", "none");
    expect(videos[0]).toHaveAttribute("poster", "/video-poster-evidence-jungle-habitat-1.webp");
    expect(videos[1]).toHaveAttribute("poster", "/video-poster-evidence-jungle-habitat-2.webp");
    expect(container.querySelectorAll("[id^='jh-source-']")).toHaveLength(9);
    expect(container.querySelectorAll(".tt-source-card")).toHaveLength(9);
    expect(screen.getByLabelText("9 references")).toBeInTheDocument();
  });
});
