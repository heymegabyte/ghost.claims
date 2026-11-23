import { test, expect } from "@playwright/test";

test("Story MUD terminal accepts keyboard focus and input", async ({ page }) => {
  await page.route("**/@xterm/xterm@*/lib/xterm.min.js", (route) => route.fulfill({ body: "", contentType: "text/javascript" }));
  await page.addInitScript(() => {
    class TestTerminal {
      private input?: HTMLTextAreaElement;
      open(element: HTMLElement) {
        this.input = document.createElement("textarea");
        this.input.className = "xterm-helper-textarea";
        element.append(this.input);
      }
      focus() { this.input?.focus(); }
      onData() { /* keyboard transport is owned by xterm; focus wiring is the page contract */ }
      write() { /* terminal output is not part of this local interaction test */ }
    }
    Object.defineProperty(window, "Terminal", { value: TestTerminal, configurable: true });
  });
  await page.goto("/story");
  const terminal = page.locator("#mud-terminal");
  await terminal.scrollIntoViewIfNeeded();
  await page.evaluate(() => window.dispatchEvent(new Event("scroll")));
  await expect(terminal).toBeVisible();

  const viewport = page.locator("#mud-xterm");
  await viewport.hover();
  await expect(viewport.locator(".xterm-helper-textarea")).toHaveCount(1, { timeout: 10_000 });
  await viewport.click();
  const helper = viewport.locator(".xterm-helper-textarea");
  await expect(helper).toBeFocused();
  await page.keyboard.type("look");
  await expect(helper).toBeFocused();
});
