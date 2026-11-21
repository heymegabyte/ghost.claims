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
  version: "1.0.9",
  sourceCommit: "0f9ea6abc9db8c6480362180027198bf0d3bba51",
  sourcePatchSha256: "09f8f19ecd8e53488d3af4c19a21df77e1a06285ff94fb0ca0beaf0b06bf887a",
  artifactSha256: "0abb9553ec09b8a008b332df660c57c555f241f87de364a822d39e770dc88135",
  componentTypes: COMPONENT_TYPES,
  components: BLOG_COMPONENT_MANIFEST,
  modules: {
    site: verifyBlogSiteModuleInvariants("ghost.claims"),
    widgets: verifyBlogWidgetsModuleInvariants("ghost.claims"),
    media: verifyBlogMediaModuleInvariants("ghost.claims"),
  },
} as const;
