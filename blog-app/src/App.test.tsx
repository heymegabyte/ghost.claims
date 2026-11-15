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
    expect(container.querySelectorAll(".tt-post")).toHaveLength(3);
    expect(screen.getByText(/speculative horror and cultural criticism/i)).toBeInTheDocument();
  });

  it("renders an article with the canonical web component and reading shell", () => {
    window.history.replaceState({}, "", "/blog/the-clout-war-above-heaven");
    const { container } = render(<App />);
    expect(screen.getByRole("heading", { level: 1, name: "The Clout War Above Heaven" })).toBeInTheDocument();
    expect(container.querySelector("tt-article-reader")?.shadowRoot).not.toBeNull();
    expect(container.querySelector(".tt-article")).not.toBeNull();
  });
});
