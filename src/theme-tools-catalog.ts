import { ALL_BLOG_CSS, BLOG_COMPONENT_MANIFEST, COMPONENT_TYPES, renderComponent } from "@theme.tools/blog/components-registry";
import { SITE_CSS, verifyBlogSiteModuleInvariants } from "@theme.tools/blog/site";
import { verifyBlogMediaModuleInvariants } from "@theme.tools/blog/media";
import { verifyBlogWidgetsModuleInvariants } from "@theme.tools/blog/widgets";

export { BLOG_COMPONENT_MANIFEST, COMPONENT_TYPES, renderComponent };

// The package advertises optional self-hosted brand fonts before its token block.
// Ghost Signal intentionally uses its own font delivery, so do not emit broken /fonts requests.
const siteCssWithoutOptionalFonts = SITE_CSS.slice(SITE_CSS.indexOf(":root{"));

export const GHOST_THEME_TOOLS_CSS = `${siteCssWithoutOptionalFonts}\n${ALL_BLOG_CSS}`;

export const GHOST_THEME_TOOLS_MANIFEST = {
  package: "@theme.tools/blog",
  version: "1.0.11",
  sourceCommit: "43906c2b246f8efc7404e04fe161a113246addaa",
  sourcePatchSha256: "2bf8516016df2a25ccd7efd581506ce9754b68ba0bf5bfbfcc97784acb6d37da",
  artifactSha256: "f392e3d83ab67fd7f368a0ff5c355aec72ae62843f353ad0edf8dbf14c552690",
  componentTypes: COMPONENT_TYPES,
  components: BLOG_COMPONENT_MANIFEST,
  modules: {
    site: verifyBlogSiteModuleInvariants("ghost.claims"),
    widgets: verifyBlogWidgetsModuleInvariants("ghost.claims"),
    media: verifyBlogMediaModuleInvariants("ghost.claims"),
  },
} as const;
