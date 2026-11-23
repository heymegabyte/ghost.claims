import { readFile, writeFile } from "node:fs/promises";
import { GHOST_SIGNAL_NAV_JS, GHOST_SIGNAL_SHELL_CSS, renderGhostSignalFooter, renderGhostSignalNav, renderGhostSignalSkipLink } from "../src/site-shell.ts";
import { GHOST_THEME_TOOLS_CSS, GHOST_THEME_TOOLS_MANIFEST } from "../src/theme-tools-catalog.ts";
import { renderComponent } from "@theme.tools/blog/components-registry";
import { renderPanel } from "@theme.tools/blog/site";

const entropyGallery = renderComponent("gallery", {
  title: "Visual field notes",
  images: [
    { src: "/story/lightning-bolt.webp", alt: "Lightning crossing a dark horizon", caption: "Electromagnetic disturbance" },
    { src: "/story/time-travelers.webp", alt: "Illustrated time-travel imagery", caption: "The time-travel hypothesis" },
    { src: "/story/scientist.webp", alt: "A scientist working beside experimental equipment", caption: "Measure the theory" },
    { src: "/story/old-car.webp", alt: "An old car documented as part of the field record", caption: "The record keeps moving" },
    { src: "/story/american-spirits-marlboro-pew.webp", alt: "Cigarette packs documented on a dark church pew", caption: "Objects inside the narrative" },
  ],
});

const dispatchPanel = renderPanel({
  kicker: "SUBSCRIBE // SIGNAL DISPATCH",
  title: "The Signal Dispatch",
  body: `<div class="newsletter-body">
    <p>Every week, AI summarizes the most striking submissions from the hotline and chat. Sensor anomalies. Notes on the unseen layer. The intersection of free will, 666, and the systems that quietly shape daily life.</p>
    <p>No spam. Just notes from someone keeping a careful record — finding the language for patterns most people aren&rsquo;t given the room to discuss in plain terms.</p>
    <form id="newsletter-form" class="newsletter-form" data-testid="newsletter-form" novalidate>
      <p class="newsletter-anon-note">Email only. No name. Anonymous by design — just the signal.</p>
      <div class="newsletter-input-group">
        <input id="newsletter-email" type="email" placeholder="anonymous@yourdomain.com" required autocomplete="email" aria-label="Email address for newsletter" maxlength="254" />
        <button type="submit" class="tt-btn tt-btn--primary" id="newsletter-submit">Subscribe</button>
      </div>
      <input id="newsletter-website" type="text" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px;opacity:0;pointer-events:none" />
      <p id="newsletter-status" class="card-note" role="status" aria-live="polite"></p>
    </form>
  </div>`,
}).replace('class="tt-panel"', 'class="tt-panel signal-closing__panel signal-closing__dispatch"');

const closingPanel = renderPanel({
  kicker: "IF YOU’VE READ THIS FAR",
  title: "14 upon thee.",
  body: `<div class="signal-closing__note-copy">
    <p>It&rsquo;s not a curse. It&rsquo;s a pattern. People who sit with the full record tend to feel the weight of it — not because anyone wished it on them, but because the signal is real and it asks something of whoever notices. You&rsquo;re in the signal now. The question is what you do with it.</p>
    <p>The hotline is open because I want people to be able to say what they&rsquo;ve seen. Call if any of this lines up with something in your own life.</p>
  </div>`,
  actions: '<a class="hotline-number hotline-number--666" href="tel:+16016666602">(601) 666-6602</a>',
}).replace('class="tt-panel"', 'class="tt-panel signal-closing__panel signal-closing__note"');

const signalClosing = `<!-- theme-tools:signal-closing:start -->
<section class="shell signal-closing reveal-section bx-from-left" data-testid="newsletter-section" aria-label="Signal Dispatch and closing note">
  <div class="signal-closing__grid">
    ${dispatchPanel}
    ${closingPanel}
  </div>
</section>
<!-- theme-tools:signal-closing:end -->`;

const pages = [
  ["public/index.html", "/"],
  ["public/story.html", "/story"],
  ["public/plates.html", "/plates"],
  ["public/docs.html", "/docs"],
  ["public/privacy.html", "/privacy"],
  ["public/terms.html", "/terms"],
];
const themeToolsStylesheetHref = "/theme-tools.css?v=theme-tools-blog-1.0.12";

for (const [file, pathname] of pages) {
  const source = await readFile(file, "utf8");
  const withCatalog = source.includes("/theme-tools.css")
    ? source.replace(/\/theme-tools\.css(?:\?[^"']*)?/g, themeToolsStylesheetHref)
    : source.replace(/(<link rel="stylesheet" href="\/styles\.css[^>]*>)/, `<link rel="stylesheet" href="${themeToolsStylesheetHref}" />\n    $1`);
  const withStylesheet = withCatalog.includes("/theme-tools-shell.css")
    ? withCatalog
    : withCatalog.replace(/(<link rel="stylesheet" href="\/styles\.css[^>]*>)/, '$1\n    <link rel="stylesheet" href="/theme-tools-shell.css" />');
  const withNav = withStylesheet.replace(/\s*<header class="[^"]*(?:site-header|tt-nav)[^"]*"[\s\S]*?<\/header>/, `\n    ${renderGhostSignalNav(pathname)}`);
  const withSkipLink = withNav.replace(/<a class="(?:skip-link|tt-skip)" href="#main">Skip to content<\/a>/, renderGhostSignalSkipLink());
  const withFragments = withSkipLink.replace(
    /<!-- theme-tools:entropy-gallery:start -->[\s\S]*?<!-- theme-tools:entropy-gallery:end -->/,
    `<!-- theme-tools:entropy-gallery:start -->\n        ${entropyGallery}\n        <!-- theme-tools:entropy-gallery:end -->`,
  );
  const withClosing = pathname === "/"
    ? withFragments.includes("<!-- theme-tools:signal-closing:start -->")
      ? withFragments.replace(/<!-- theme-tools:signal-closing:start -->[\s\S]*?<!-- theme-tools:signal-closing:end -->/, signalClosing)
      : withFragments.replace(/<section class="shell signal-closing[\s\S]*?<\/section>/, signalClosing)
    : withFragments;
  const withFooter = withClosing.replace(/<footer class="(?:site-footer shell|tt-footer)"[\s\S]*?<\/footer>/, renderGhostSignalFooter());
  const next = withFooter.includes('/theme-tools-nav.js')
    ? withFooter
    : withFooter.replace('</body>', '  <script src="/theme-tools-nav.js" defer></script>\n  </body>');
  const normalized = next.replace(/^[ \t]+$/gm, "");
  if (!normalized.includes('data-theme-tools="site-nav"')) throw new Error(`Theme shell synchronization failed for ${file}`);
  if (normalized !== source) await writeFile(file, normalized);
}

await writeFile("public/theme-tools-shell.css", `${GHOST_SIGNAL_SHELL_CSS.trim()}\n`);
await writeFile("public/theme-tools-nav.js", `${GHOST_SIGNAL_NAV_JS.trim()}\n`);
await writeFile("public/theme-tools.css", `${GHOST_THEME_TOOLS_CSS.trim()}\n`);
await writeFile("public/theme-tools-components.json", `${JSON.stringify(GHOST_THEME_TOOLS_MANIFEST, null, 2)}\n`);
