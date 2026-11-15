import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import App from "./App";
import { registerThemeToolsElements } from "./theme-tools";

registerThemeToolsElements();

afterEach(() => {
  cleanup();
  window.history.replaceState({}, "", "/blog");
});

describe("Night Archive", () => {
  it("renders the canonical theme.tools post grid from structured content", () => {
    window.history.replaceState({}, "", "/blog");
    const { container } = render(<App />);
    expect(screen.getByText("Stories for the watched.")).toBeInTheDocument();
    expect(container.querySelectorAll(".tt-post")).toHaveLength(4);
    expect(screen.getByText(/speculative horror and cultural criticism/i)).toBeInTheDocument();
    expect(screen.getByAltText("Ghost Signal logo")).toHaveAttribute("src", expect.stringContaining("/logo-nav.png"));
    expect(screen.getByRole("navigation").querySelectorAll("a")).toHaveLength(5);
    expect(screen.getByRole("link", { name: "Blog" })).toHaveAttribute("aria-current", "page");
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
});
