import { renderSiteFooter, renderSiteNav, renderSkipLink } from "@theme.tools/blog/site";

export const GHOST_SIGNAL_NAV_LINKS = [
  { label: "Signal", href: "/" },
  { label: "Transmissions", href: "/transmissions" },
  { label: "Blog", href: "/blog" },
  { label: "Docs", href: "/docs" },
  { label: "API", href: "/api/docs" },
] as const;

export const GHOST_SIGNAL_SHELL_CSS = `
:root{--gs-shell-bg:#060610;--gs-shell-text:#f4faff;--gs-shell-muted:#aaa0a2;--gs-shell-accent:#ff667d;--gs-shell-line:rgba(255,255,255,.09);--gs-shell-font:"Space Grotesk","Sora",ui-sans-serif,system-ui,sans-serif}
.tt-skip{position:fixed;top:.75rem;left:.75rem;z-index:1000;padding:.75rem 1rem;border-radius:.65rem;color:#02121a;background:#00e5ff;font:800 .8rem/1 var(--gs-shell-font);text-decoration:none;transform:translateY(-200%);transition:transform .16s ease}.tt-skip:focus{transform:translateY(0);outline:2px solid #fff;outline-offset:2px}
.tt-nav{box-sizing:border-box;position:sticky;top:0;z-index:100;display:flex;align-items:center;justify-content:space-between;flex-wrap:nowrap;gap:1rem;width:100%;max-width:none;min-height:66px;margin:0;padding:.65rem max(1rem,calc(50vw - 560px));background:linear-gradient(180deg,rgba(6,6,16,.97),rgba(6,6,16,.9));border-bottom:1px solid var(--gs-shell-line);box-shadow:0 8px 24px rgba(0,0,0,.45),0 1px 0 rgba(0,229,255,.08) inset;backdrop-filter:blur(22px) saturate(145%);-webkit-backdrop-filter:blur(22px) saturate(145%);view-transition-name:site-header}
.tt-nav *{box-sizing:border-box}
.tt-nav a{text-decoration:none}
.tt-nav .tt-nav__brand{display:inline-flex;align-items:center;gap:.75rem;min-width:0;color:var(--gs-shell-text);font:800 .95rem/1 var(--gs-shell-font);letter-spacing:.06em;white-space:nowrap}
.tt-nav__logo{width:34px;height:34px;flex:0 0 34px;padding:3px;border-radius:10px;object-fit:contain;background:rgba(6,6,16,.78);box-shadow:0 0 0 1px rgba(0,229,255,.32),0 8px 28px rgba(0,229,255,.18);transition:transform .22s ease,box-shadow .22s ease}
.tt-nav__brand:hover .tt-nav__logo,.tt-nav__brand:focus-visible .tt-nav__logo{transform:scale(1.05) rotate(-2deg);box-shadow:0 0 0 1px rgba(0,229,255,.62),0 10px 32px rgba(0,229,255,.34)}
.tt-nav__word{white-space:nowrap}
.tt-nav__links{display:flex;align-items:center;flex-wrap:nowrap;width:auto;gap:.35rem;min-width:0;padding:.25rem;border:1px solid var(--gs-shell-line);border-radius:999px;background:rgba(6,6,16,.72);font:600 .82rem/1 var(--gs-shell-font)}
.tt-nav .tt-nav__link{display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:.65rem .82rem;border-radius:999px;color:var(--gs-shell-muted);transition:color .18s ease,background .18s ease,transform .18s ease}
.tt-nav .tt-nav__link:hover,.tt-nav .tt-nav__link:focus-visible,.tt-nav .tt-nav__link[aria-current="page"]{color:var(--gs-shell-text);background:rgba(255,23,68,.12);transform:translateY(-1px)}
.tt-nav .tt-nav__link[aria-current="page"]{color:var(--gs-shell-accent);box-shadow:inset 0 0 0 1px rgba(255,102,125,.16)}
.tt-nav__hotline{display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:.65rem .85rem;border:1px solid rgba(255,102,125,.28);border-radius:999px;color:var(--gs-shell-accent);background:rgba(255,23,68,.08);font:800 .76rem/1 var(--gs-shell-font);letter-spacing:.04em;white-space:nowrap;transition:background .18s ease,transform .18s ease}
.tt-nav__hotline:hover,.tt-nav__hotline:focus-visible{background:rgba(255,23,68,.18);transform:translateY(-1px)}
.tt-nav__brand:focus-visible,.tt-nav__link:focus-visible{outline:2px solid #00e5ff;outline-offset:3px}
.tt-footer{box-sizing:border-box;width:min(1120px,calc(100% - 2rem));margin:clamp(3rem,8vw,6rem) auto 0;padding:2rem 0;border-top:1px solid var(--gs-shell-line);color:var(--gs-shell-muted);font:500 .78rem/1.6 var(--gs-shell-font)}
.tt-footer__row{display:flex;align-items:center;justify-content:space-between;gap:1.5rem}.tt-footer__links{display:flex;flex-wrap:wrap;gap:.4rem 1rem}.tt-footer a{color:var(--gs-shell-muted);text-decoration:none}.tt-footer a:hover,.tt-footer a:focus-visible{color:var(--gs-shell-text)}
@media(max-width:860px){.tt-nav__hotline{display:none}}
@media(max-width:760px){.tt-nav{align-items:center;min-height:58px;padding:.5rem .75rem;gap:.6rem}.tt-nav__brand{gap:.5rem;font-size:.78rem}.tt-nav__logo{width:32px;height:32px;flex-basis:32px}.tt-nav__links{gap:.15rem;overflow-x:auto;overscroll-behavior-inline:contain;scrollbar-width:none;border:0;border-radius:0;background:transparent}.tt-nav__links::-webkit-scrollbar{display:none}.tt-nav .tt-nav__link{min-height:44px;padding:.55rem .68rem;font-size:.78rem}.tt-footer__row{align-items:flex-start;flex-direction:column}}
@media(max-width:520px){.tt-nav__word{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}.tt-nav__brand{flex:0 0 auto}.tt-nav__links{flex:1}}
@media(prefers-reduced-motion:reduce){.tt-nav__logo,.tt-nav__link{transition:none}.tt-nav__link:hover,.tt-nav__link:focus-visible{transform:none}}
`;

export function renderGhostSignalNav(pathname: string): string {
  const activeHref = pathname.startsWith("/blog")
    ? "/blog"
    : pathname.startsWith("/api/docs")
      ? "/api/docs"
      : pathname.startsWith("/transmissions")
        ? "/transmissions"
        : pathname.startsWith("/docs")
          ? "/docs"
          : pathname === "/"
            ? "/"
            : undefined;

  let markup = renderSiteNav({
    brand: "GHOST // SIGNAL",
    brandHref: "/",
    links: [...GHOST_SIGNAL_NAV_LINKS],
  }).replace(
    '<span class="tt-nav__mark" aria-hidden="true"></span>',
    '<img class="tt-nav__logo" src="/logo-nav.png?v=2945c6a-1778550809" alt="Ghost Signal logo" width="34" height="34" decoding="async" />',
  );

  if (activeHref) {
    markup = markup.replace(
      `class="tt-nav__link" href="${activeHref}"`,
      `class="tt-nav__link" href="${activeHref}" aria-current="page"`,
    );
  }

  return markup
    .replace('<header class="tt-nav">', '<header class="tt-nav" data-theme-tools="site-nav">')
    .replace('<nav class="tt-nav__links">', '<nav class="tt-nav__links" aria-label="Primary">')
    .replace('</header>', '<a class="tt-nav__hotline" href="tel:+16016666602" aria-label="Call the Ghost Signal hotline at 601 666 6602">Call 666</a></header>');
}

export function renderGhostSignalFooter(): string {
  return renderSiteFooter({
    note: "ghost.claims // Public signal. Open data. Night archive.",
    links: [
      ...GHOST_SIGNAL_NAV_LINKS,
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  }).replace('<footer class="tt-footer">', '<footer class="tt-footer" data-theme-tools="site-footer">');
}

export function renderGhostSignalSkipLink(): string {
  return renderSkipLink().replace('href="#tt-main"', 'href="#main"');
}
