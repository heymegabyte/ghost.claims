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
  version: "1.0.15",
  sourceCommit: "6a3452fe6628ea54ef690de94e9c223e7dd3cfd8",
  sourcePatchSha256: "27860440878df02c3b884497fd0be4259fbe61abc4c41a502d61989c7c19e652",
  artifactSha256: "ddf361cecef0ab8c4f4092df2091106a28368268c2210f476bdf70bd5e42af9b",
  componentTypes: COMPONENT_TYPES,
  components: BLOG_COMPONENT_MANIFEST,
  modules: {
    site: verifyBlogSiteModuleInvariants("ghost.claims"),
    widgets: verifyBlogWidgetsModuleInvariants("ghost.claims"),
    media: verifyBlogMediaModuleInvariants("ghost.claims"),
  },
} as const;
