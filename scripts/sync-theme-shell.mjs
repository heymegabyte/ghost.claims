import { readFile, writeFile } from "node:fs/promises";
import { GHOST_SIGNAL_SHELL_JS, GHOST_SIGNAL_SHELL_CSS, renderGhostSignalFooter, renderGhostSignalNav, renderGhostSignalSkipLink } from "../src/site-shell.ts";
import { GHOST_THEME_TOOLS_CSS, GHOST_THEME_TOOLS_MANIFEST } from "../src/theme-tools-catalog.ts";
import { renderComponent } from "@theme.tools/blog/components-registry";

const entropyGallery = renderComponent("gallery", {
  title: "Visual field notes",
  variant: "showcase",
  images: [
    { src: "/story/lightning-bolt.webp", alt: "Lightning crossing a dark horizon", caption: "Electromagnetic disturbance" },
    { src: "/story/time-travelers.webp", alt: "Illustrated time-travel imagery", caption: "The time-travel hypothesis" },
    { src: "/story/scientist.webp", alt: "A scientist working beside experimental equipment", caption: "Measure the theory" },
    { src: "/story/old-car.webp", alt: "An old car documented as part of the field record", caption: "The record keeps moving" },
    { src: "/story/american-spirits-marlboro-pew.webp", alt: "Cigarette packs documented on a dark church pew", caption: "Objects inside the narrative" },
  ],
});

const pages = [
  ["public/index.html", "/"],
  ["public/story.html", "/story"],
  ["public/plates.html", "/plates"],
  ["public/docs.html", "/docs"],
  ["public/privacy.html", "/privacy"],
  ["public/terms.html", "/terms"],
];
const themeToolsStylesheetHref = "/theme-tools.css?v=theme-tools-blog-1.0.17";
const themeToolsShellStylesheetHref = "/theme-tools-shell.css?v=20261123-visual-convergence";

for (const [file, pathname] of pages) {
  const source = await readFile(file, "utf8");
  const withCatalog = source.includes("/theme-tools.css")
    ? source.replace(/\/theme-tools\.css(?:\?[^"']*)?/g, themeToolsStylesheetHref)
    : source.replace(/(<link rel="stylesheet" href="\/styles\.css[^>]*>)/, `<link rel="stylesheet" href="${themeToolsStylesheetHref}" />\n    $1`);
  const withStylesheet = withCatalog.includes("/theme-tools-shell.css")
    ? withCatalog.replace(/\/theme-tools-shell\.css(?:\?[^"']*)?/g, themeToolsShellStylesheetHref)
    : withCatalog.replace(/(<link rel="stylesheet" href="\/styles\.css[^>]*>)/, `$1\n    <link rel="stylesheet" href="${themeToolsShellStylesheetHref}" />`);
  const withNav = withStylesheet.replace(/\s*<header class="[^"]*(?:site-header|tt-nav)[^"]*"[\s\S]*?<\/header>/, `\n    ${renderGhostSignalNav(pathname)}`);
  const withSkipLink = withNav.replace(/<a class="(?:skip-link|tt-skip)" href="#main">Skip to content<\/a>/, renderGhostSignalSkipLink());
  const withFragments = withSkipLink.replace(
    /<!-- theme-tools:entropy-gallery:start -->[\s\S]*?<!-- theme-tools:entropy-gallery:end -->/,
    `<!-- theme-tools:entropy-gallery:start -->\n        ${entropyGallery}\n        <!-- theme-tools:entropy-gallery:end -->`,
  );
  const withClosing = withFragments.replace(/\s*<!-- theme-tools:signal-closing:start -->[\s\S]*?<!-- theme-tools:signal-closing:end -->/, "");
  const withFooter = withClosing.replace(/<footer class="(?:site-footer shell|tt-footer)"[\s\S]*?<\/footer>/, renderGhostSignalFooter());
  const withoutChatLabel = withFooter.replace(/\s*<span class="chat-toggle-label">AI<\/span>/g, "");
  const next = withoutChatLabel.includes('/theme-tools-nav.js')
    ? withoutChatLabel
    : withoutChatLabel.replace('</body>', '  <script src="/theme-tools-nav.js" defer></script>\n  </body>');
  const normalized = next.replace(/^[ \t]+$/gm, "");
  if (!normalized.includes('data-theme-tools="site-nav"')) throw new Error(`Theme shell synchronization failed for ${file}`);
  if (normalized !== source) await writeFile(file, normalized);
}

await writeFile("public/theme-tools-shell.css", `${GHOST_SIGNAL_SHELL_CSS.trim()}\n`);
await writeFile("public/theme-tools-nav.js", `${GHOST_SIGNAL_SHELL_JS.trim()}\n`);
const productionThemeCss = GHOST_THEME_TOOLS_CSS
  .replace(/\/\*[\s\S]*?\*\//g, "")
  .replace(/[ \t]+$/gm, "")
  .replace(/\n{3,}/g, "\n\n")
  .trim();
await writeFile("public/theme-tools.css", `${productionThemeCss}\n`);
await writeFile("public/theme-tools-components.json", `${JSON.stringify(GHOST_THEME_TOOLS_MANIFEST, null, 2)}\n`);
