import { ALL_BLOG_CSS, BLOG_COMPONENT_MANIFEST, COMPONENT_TYPES, renderComponent } from "@theme.tools/blog/components-registry";
import { SITE_CSS, verifyBlogSiteModuleInvariants } from "@theme.tools/blog/site";
import { verifyBlogMediaModuleInvariants } from "@theme.tools/blog/media";
import { verifyBlogWidgetsModuleInvariants } from "@theme.tools/blog/widgets";

export { BLOG_COMPONENT_MANIFEST, COMPONENT_TYPES, renderComponent };

// The package advertises optional self-hosted brand fonts before its token block.
// Ghost Signal intentionally uses its own font delivery, so do not emit broken /fonts requests.
const siteCssWithoutOptionalFonts = SITE_CSS.slice(SITE_CSS.indexOf(":root{"));

export const GHOST_THEME_TOOLS_CSS = `${siteCssWithoutOptionalFonts}\n${ALL_BLOG_CSS}\n
/* Consumer-wide surface guarantees. */
#main{background:none!important}
:where(button,[role="button"],a.tt-btn,a.button,a[class*="button"],a[class*="btn"],input[type="button"],input[type="submit"]){text-decoration:none!important}
:where(a.tt-btn,a.button,a[role="button"],a[class*="button"],a[class*="btn"])::after{content:none!important;text-decoration:none!important}
`;

export const GHOST_THEME_TOOLS_MANIFEST = {
  package: "@theme.tools/blog",
  version: "1.0.17",
  sourceCommit: "b9f3f60e",
  sourcePatchSha256: "7bd7d32e8b606f95e45100fd3d6906ac6ab61cf725593a187f5690046ff04f23",
  artifactSha256: "5701fb894673c3fc71bae07faec4330ceb8a482b3de27fd502b844c7a959ebff",
  componentTypes: COMPONENT_TYPES,
  components: BLOG_COMPONENT_MANIFEST,
  modules: {
    site: verifyBlogSiteModuleInvariants("ghost.claims"),
    widgets: verifyBlogWidgetsModuleInvariants("ghost.claims"),
    media: verifyBlogMediaModuleInvariants("ghost.claims"),
  },
} as const;
