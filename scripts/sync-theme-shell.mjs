import { readFile, writeFile } from "node:fs/promises";
import { GHOST_SIGNAL_SHELL_CSS, renderGhostSignalFooter, renderGhostSignalNav, renderGhostSignalSkipLink } from "../src/site-shell.ts";
import { GHOST_THEME_TOOLS_CSS, GHOST_THEME_TOOLS_MANIFEST } from "../src/theme-tools-catalog.ts";

const pages = [
  ["public/index.html", "/"],
  ["public/docs.html", "/docs"],
  ["public/privacy.html", "/privacy"],
  ["public/terms.html", "/terms"],
];
const themeToolsStylesheetHref = "/theme-tools.css?v=theme-tools-blog-1.0.5";

for (const [file, pathname] of pages) {
  const source = await readFile(file, "utf8");
  const withCatalog = source.includes("/theme-tools.css")
    ? source.replace(/\/theme-tools\.css(?:\?[^"']*)?/g, themeToolsStylesheetHref)
    : source.replace(/(<link rel="stylesheet" href="\/styles\.css[^>]*>)/, `<link rel="stylesheet" href="${themeToolsStylesheetHref}" />\n    $1`);
  const withStylesheet = withCatalog.includes("/theme-tools-shell.css")
    ? withCatalog
    : withCatalog.replace(/(<link rel="stylesheet" href="\/styles\.css[^>]*>)/, '$1\n    <link rel="stylesheet" href="/theme-tools-shell.css" />');
  const withNav = withStylesheet.replace(/\s*<header class="(?:site-header|tt-nav)"[\s\S]*?<\/header>/, `\n    ${renderGhostSignalNav(pathname)}`);
  const withSkipLink = withNav.replace(/<a class="(?:skip-link|tt-skip)" href="#main">Skip to content<\/a>/, renderGhostSignalSkipLink());
  const next = withSkipLink.replace(/<footer class="(?:site-footer shell|tt-footer)"[\s\S]*?<\/footer>/, renderGhostSignalFooter());
  if (!next.includes('data-theme-tools="site-nav"')) throw new Error(`Theme shell synchronization failed for ${file}`);
  if (next !== source) await writeFile(file, next);
}

await writeFile("public/theme-tools-shell.css", `${GHOST_SIGNAL_SHELL_CSS.trim()}\n`);
await writeFile("public/theme-tools.css", `${GHOST_THEME_TOOLS_CSS.trim()}\n`);
await writeFile("public/theme-tools-components.json", `${JSON.stringify(GHOST_THEME_TOOLS_MANIFEST, null, 2)}\n`);
