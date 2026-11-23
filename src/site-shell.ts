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
  links: [],
  layout: "full",
  logo: {
    src: "/logo-nav.png?v=2945c6a-1778550809",
    alt: "Ghost Signal logo",
    width: 34,
    height: 34,
  },
  megaMode: "overlay",
  megaTriggerLabel: "Browse",
  megaLabel: "Browse Ghost Signal",
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
      label: "Story", href: "/story", icon: "⌁", blurb: "The first-person chronology, evidence dossier, and path to the public experiment.",
      items: [
        { label: "Evidence timeline", href: "/story#timeline", sub: "Archive" },
        { label: "The dossier", href: "/story#dossier", sub: "Record" },
        { label: "Transmissions", href: "/transmissions", sub: "Calls" },
      ],
      featured: { src: "/story/time-travelers.webp", alt: "Figures crossing a luminous field", href: "/story", title: "Read the story behind the signal", kicker: "First-person record" },
    },
    {
      label: "Plates", href: "/plates", icon: "▣", blurb: "The complete road-photo archive and an essay about pattern, perception, and documentation.",
      items: [
        { label: "Plate essay", href: "/plates#plate-essay", sub: "Account" },
        { label: "Photo archive", href: "/plates#plate-vault-grid", sub: "Evidence" },
        { label: "The Signal", href: "/#the-signal", sub: "Film" },
      ],
      featured: { src: "/evidence-plate-blckchn.webp", alt: "BLCKCHN vanity plate documented in the Ghost Signal archive", href: "/plates", title: "Open the complete plate archive", kicker: "Field archive" },
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
} as const;

const GHOST_SIGNAL_OVERLAY_NAVIGATION_JS = `(function(){
  if(window.__ghostSignalOverlayNavigation)return;window.__ghostSignalOverlayNavigation=true;
  document.addEventListener('click',function(event){
    var node=event.target;var link=node&&node.closest?node.closest('[data-tt-ov-panel] a[href]'):null;
    if(!link)return;
    var panel=link.closest('[data-tt-ov-panel]');var closeButton=panel&&panel.querySelector('[data-tt-ov-close]');
    var raw=link.getAttribute('href');var url;
    try{url=new URL(raw,location.href);}catch(error){if(closeButton)closeButton.click();return;}
    var sameDocument=url.origin===location.origin&&url.pathname===location.pathname&&url.search===location.search;
    if(closeButton)closeButton.click();
    if(!sameDocument||!url.hash)return;
    event.preventDefault();
    var previousHash=location.hash;
    location.hash=url.hash;
    if(previousHash===url.hash&&window.HashChangeEvent)window.dispatchEvent(new HashChangeEvent('hashchange'));
    var target=document.getElementById(decodeURIComponent(url.hash.slice(1)));
    if(target)setTimeout(function(){target.scrollIntoView({block:'start'});},0);
  });
})();`;

export const GHOST_SIGNAL_NAV_JS = `${NAV_MENU_JS}\n${GHOST_SIGNAL_OVERLAY_NAVIGATION_JS}`;

export const GHOST_SIGNAL_SHELL_CSS = `
.tt-nav{view-transition-name:site-header}
.tt-nav__brand{min-height:44px}
.tt-nav__logo{width:24px;height:24px;flex:0 0 24px;padding:2px;border-radius:8px;object-fit:contain;background:var(--tt-ink-2);box-shadow:0 0 20px rgba(0,229,255,.45),0 0 0 1px var(--tt-line-2)}
.tt-nav__link[aria-current="page"]{color:var(--tt-cyan);text-decoration:underline;text-decoration-thickness:2px;text-underline-offset:6px}
.tt-nav--overlay .tt-nav__actions{gap:0}
.tt-nav--overlay .tt-nav__links:empty{display:none}
/* Five-pass Browse convergence: silhouette, depth, icon rhythm, interaction, and responsive finish. */
.tt-nav--overlay .tt-nav__ov-trigger{
  position:relative;isolation:isolate;min-height:44px;padding:9px 17px 9px 14px;gap:11px;overflow:hidden;
  border:1px solid rgba(117,238,255,.34);border-radius:15px;color:#eaffff;
  background:linear-gradient(135deg,rgba(7,27,38,.96),rgba(7,12,27,.94));
  box-shadow:inset 0 1px 0 rgba(255,255,255,.1),inset 0 -1px 0 rgba(0,229,255,.06),0 10px 34px -18px rgba(0,229,255,.76);
  font-size:.82rem;font-weight:760;letter-spacing:.055em;text-transform:uppercase;
  transition:transform .24s cubic-bezier(.22,1,.36,1),border-color .24s ease,box-shadow .24s ease,color .24s ease
}
.tt-nav--overlay .tt-nav__ov-trigger::before{
  content:"";position:absolute;inset:0;z-index:-1;opacity:.82;
  background:radial-gradient(circle at 14% 12%,rgba(0,229,255,.22),transparent 42%),linear-gradient(105deg,transparent 28%,rgba(255,255,255,.08) 48%,transparent 68%);
  transform:translateX(-36%);transition:transform .55s cubic-bezier(.22,1,.36,1),opacity .24s ease
}
.tt-nav--overlay .tt-nav__ov-trigger::after{
  content:"";position:absolute;inset:3px;border-radius:11px;border:1px solid rgba(255,255,255,.035);pointer-events:none
}
.tt-nav--overlay .tt-nav__ov-grid{width:16px;height:16px;gap:3px}
.tt-nav--overlay .tt-nav__ov-grid i{border-radius:2px;background:linear-gradient(145deg,#a7f7ff,#00e5ff);box-shadow:0 0 10px rgba(0,229,255,.72)}
.tt-nav--overlay .tt-nav__ov-label{line-height:1}
.tt-nav--overlay .tt-nav__ov-chev{margin-left:1px;color:#8ddde8;filter:drop-shadow(0 0 5px rgba(0,229,255,.45))}
.tt-nav--overlay .tt-nav__ov-trigger:hover{
  transform:translateY(-2px);border-color:rgba(139,244,255,.72);color:#fff;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.14),0 16px 38px -16px rgba(0,229,255,.9),0 0 0 1px rgba(0,229,255,.08)
}
.tt-nav--overlay .tt-nav__ov-trigger:hover::before{transform:translateX(30%);opacity:1}
.tt-nav--overlay .tt-nav__ov-trigger:active{transform:translateY(0) scale(.98)}
.tt-nav--overlay .tt-nav__ov-trigger[aria-expanded="true"]{border-color:#75efff;color:#fff;background:linear-gradient(135deg,rgba(0,48,60,.98),rgba(10,14,34,.98));box-shadow:inset 0 1px 0 rgba(255,255,255,.15),0 0 34px -8px rgba(0,229,255,.78)}
.tt-nav--overlay .tt-nav__ov-trigger:focus-visible{outline:2px solid #baf8ff;outline-offset:4px}
.tt-nav--overlay .tt-ov__sheet{background:radial-gradient(100% 90% at 0 0,rgba(0,229,255,.09),transparent 50%),linear-gradient(145deg,rgba(5,20,30,.99),rgba(5,7,20,.995));box-shadow:inset 0 1px 0 rgba(255,255,255,.08),0 44px 110px -36px rgba(0,0,0,.98),0 0 90px -35px rgba(0,229,255,.55)}
.tt-nav--overlay .tt-ov__top{justify-content:flex-end;margin-bottom:10px}
@media(max-width:640px){
  .tt-nav--overlay .tt-nav__ov-trigger{min-height:44px;padding:8px 14px 8px 12px;border-radius:14px;font-size:.76rem}
  .tt-nav--overlay .tt-nav__ov-grid{width:15px;height:15px}
  .tt-nav--overlay .tt-nav__ov-label{position:static;width:auto;height:auto;padding:0;margin:0;overflow:visible;clip:auto;white-space:nowrap;border:0}
}
@media(prefers-reduced-motion:reduce){
  .tt-nav--overlay .tt-nav__ov-trigger,.tt-nav--overlay .tt-nav__ov-trigger::before{transition:none}
}
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
