import { renderSiteFooter, renderSiteNav, renderSkipLink } from "@theme.tools/blog/site";

export const GHOST_SIGNAL_NAV_LINKS = [
  { label: "Signal", href: "/" },
  { label: "Transmissions", href: "/transmissions" },
  { label: "Blog", href: "/blog" },
  { label: "Docs", href: "/docs" },
  { label: "API", href: "/api/docs" },
] as const;

export const GHOST_SIGNAL_SHELL_CSS = `
.tt-nav{view-transition-name:site-header}
.tt-nav__logo{width:24px;height:24px;flex:0 0 24px;padding:2px;border-radius:8px;object-fit:contain;background:var(--tt-ink-2);box-shadow:0 0 20px rgba(0,229,255,.45),0 0 0 1px var(--tt-line-2)}
.tt-nav__link[aria-current="page"]{color:var(--tt-cyan);text-decoration:underline;text-decoration-thickness:2px;text-underline-offset:6px}
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
    .replace('<nav class="tt-nav__links">', '<nav class="tt-nav__links" aria-label="Primary">');
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
