import { NAV_MENU_JS, renderSiteFooter, renderSiteNavFromJson, renderSkipLink } from "@theme.tools/blog/site";

export const GHOST_SIGNAL_NAV_LINKS = [
  { label: "Signal", href: "/" },
  { label: "Transmissions", href: "/transmissions" },
  { label: "Blog", href: "/blog" },
  { label: "Docs", href: "/docs" },
  { label: "API", href: "/api/docs" },
] as const;

export const GHOST_SIGNAL_NAV_CONFIG = {
  brand: "GHOST // SIGNAL",
  brandHref: "/",
  links: [
    { label: "AI", href: "/#chat-widget" },
    { label: "Call", href: "tel:+16016666602", cta: true },
  ],
  layout: "full",
  logo: {
    src: "/logo-nav.png?v=2945c6a-1778550809",
    alt: "Ghost Signal logo",
    width: 34,
    height: 34,
  },
  megaMode: "overlay",
  megaTriggerLabel: "Explore",
  megaLabel: "Explore Ghost Signal",
  megaSearch: { action: "/blog", placeholder: "Search signals, records, and field notes…" },
  mega: [
    {
      label: "Signal", href: "/", icon: "◉", blurb: "Live electromagnetic readings, entropy, and the core public experiment.",
      items: [
        { label: "Live signal", href: "/#live", sub: "EMF" },
        { label: "Entropy API", href: "/#entropy", sub: "Random" },
        { label: "Signal AI", href: "/#chat-widget", sub: "Chat" },
      ],
      featured: { src: "/evidence-radiation-tdr.webp", alt: "Ghost Signal electromagnetic sensor display", href: "/#live", title: "Read the live electromagnetic field", kicker: "Live now" },
    },
    {
      label: "Records", href: "/transmissions", icon: "⌁", blurb: "Public calls, the evidence timeline, and recorded transmissions.",
      items: [
        { label: "Transmissions", href: "/transmissions", sub: "Calls" },
        { label: "Evidence timeline", href: "/#timeline", sub: "Archive" },
        { label: "The Signal", href: "/#the-signal", sub: "Film" },
      ],
      featured: { src: "/story/time-travelers.webp", alt: "Figures crossing a luminous field", href: "/transmissions", title: "Open the public transmission record", kicker: "Public record" },
    },
    {
      label: "Journal", href: "/blog", icon: "✦", blurb: "Reported memory, strange histories, engineering dossiers, and Night Archive field notes.",
      items: [
        { label: "All articles", href: "/blog", sub: "Journal" },
        { label: "Greystone", href: "/blog/greystone-after-the-skunk", sub: "Field note" },
        { label: "Jungle Habitat", href: "/blog/jungle-habitat-dead-battery-safari-trails", sub: "Trail report" },
      ],
      featured: { src: "/story/old-car.webp", alt: "Abandoned car in a dark landscape", href: "/blog", title: "Enter the Ghost Signal Journal", kicker: "Night Archive" },
    },
    {
      label: "Developers", href: "/docs", icon: "</>", blurb: "Integrate the public sensor, inspect schemas, and use the documented API.",
      items: [
        { label: "Documentation", href: "/docs", sub: "Guides" },
        { label: "API reference", href: "/api/docs", sub: "OpenAPI" },
        { label: "Privacy", href: "/privacy", sub: "Policy" },
      ],
      featured: { src: "/story/scientist.webp", alt: "Scientist studying a luminous instrument", href: "/docs", title: "Build with the Ghost Signal API", kicker: "Open data" },
    },
  ],
  megaLatest: { title: "Latest", items: [
    { label: "Sensor telemetry web dossier", href: "/blog/sensor-telemetry-web-dossier", meta: "Engineering dossier" },
    { label: "Greystone after the institution", href: "/blog/greystone-after-the-skunk", meta: "New Jersey field note" },
    { label: "Jungle Habitat after the safari", href: "/blog/jungle-habitat-dead-battery-safari-trails", meta: "Trail report" },
  ] },
  megaCta: { kicker: "Live edge", title: "Read the field right now", blurb: "Open the live sensor, copy entropy, or inspect the source API.", href: "/#live", cta: "Open live signal" },
  megaQuick: { title: "Quick actions", items: [
    { label: "Ask Signal AI", href: "/#chat-widget", icon: "AI", sub: "Open the chat" },
    { label: "Call the hotline", href: "tel:+16016666602", icon: "☎", sub: "(601) 666-6602" },
    { label: "API reference", href: "/api/docs", icon: "{}", sub: "Schemas and endpoints" },
  ] },
  account: { href: "/#manifesto", label: "Open the operator manifesto", avatarSrc: "/apple-touch-icon.png?v=2945c6a-1778550809", avatarAlt: "Ghost Signal operator" },
} as const;

export const GHOST_SIGNAL_NAV_JS = NAV_MENU_JS;

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

  let markup = renderSiteNavFromJson(GHOST_SIGNAL_NAV_CONFIG);

  if (activeHref) {
    markup = markup.replace(
      `class="tt-ov__card" role="menuitem" href="${activeHref}"`,
      `class="tt-ov__card" role="menuitem" href="${activeHref}" aria-current="page"`,
    );
  }

  return markup
    .replace(
      '<header class="tt-nav tt-nav--overlay tt-nav--full"',
      '<header class="tt-nav tt-nav--overlay tt-nav--full" data-theme-tools="site-nav"',
    )
    .replace('<nav class="tt-nav__links">', '<nav class="tt-nav__links" aria-label="Utilities">');
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
