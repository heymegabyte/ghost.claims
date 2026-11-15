import { SITE_CSS, renderArticle, renderPageHeader, renderPostGrid, renderSiteNav } from "@theme.tools/blog/site";
import { MEDIA_CSS, renderMedia } from "@theme.tools/blog/media";
import { WIDGET_CSS, renderWidget } from "@theme.tools/blog/widgets";
import { useEffect } from "react";
import { articles, type NightArchiveArticle } from "./content";
import { CanonicalMarkup } from "./theme-tools";
import "./app.css";

// The shared stylesheet optionally advertises self-hosted brand fonts. Ghost
// Signal deliberately uses the package's system fallbacks, so omit only those
// two host-level @font-face declarations instead of issuing broken requests.
const themeCss = SITE_CSS.slice(SITE_CSS.indexOf(":root{"));

const canonicalNav = renderSiteNav({
  brand: "GHOST // SIGNAL",
  brandHref: "/",
  links: [
    { label: "Signal", href: "/" },
    { label: "Transmissions", href: "/transmissions" },
    { label: "Blog", href: "/blog" },
    { label: "Docs", href: "/docs" },
    { label: "API", href: "/api/docs" },
  ],
});

// Keep theme.tools as the renderer while adapting its brand slot to the exact
// production logo asset used by the canonical homepage shell.
const nav = canonicalNav
  .replace(
    '<span class="tt-nav__mark" aria-hidden="true"></span>',
    '<img class="tt-nav__logo" src="/logo-nav.png?v=2945c6a-1778550809" alt="Ghost Signal logo" width="34" height="34" decoding="async" />',
  )
  .replace('<a class="tt-nav__link" href="/blog">Blog</a>', '<a class="tt-nav__link" href="/blog" aria-current="page">Blog</a>');

function articleBody(article: NightArchiveArticle): string {
  return article.sections.map((section, sectionIndex) => {
    const id = `${article.slug}-${sectionIndex + 1}`;
    const heading = section.heading ? `<h2 id="${id}">${section.heading}</h2>` : "";
    const paragraphs = section.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("");
    const quote = section.quote ? `<blockquote>${section.quote}</blockquote>` : "";
    const components = section.components?.map((component) => component.kind === "widget"
      ? renderWidget(component.type, component.data)
      : renderMedia(component.type, component.data)).join("") ?? "";
    return `<section>${heading}${paragraphs}${quote}${components}</section>`;
  }).join("");
}

function ArchiveIndex() {
  const cards = renderPostGrid({
    posts: articles.map((article) => ({
      title: article.title,
      description: article.standfirst,
      href: `/blog/${article.slug}`,
      tag: article.file.replace("FILE ", ""),
      meta: `${article.readingMinutes} min transmission · ${article.genre ?? "fiction"}`,
    })),
  });

  return <>
    <CanonicalMarkup html={renderPageHeader({
      kicker: "NIGHT ARCHIVE // FILES RECOVERED AFTER MIDNIGHT",
      title: "Stories for the watched.",
      lede: "Field notes from imagined systems that watch, rank, rehearse, and consume us—until spectacle feels like fate and the script starts wearing a human face.",
    })} />
    <aside className="night-disclosure" role="note"><strong>Editorial note:</strong> Night Archive is speculative horror and cultural criticism. Its cosmic forces, conspiracies, and characters are fictional metaphors, not claims about real people or events.</aside>
    <CanonicalMarkup html={cards} className="night-grid" />
  </>;
}

function ArticlePage({ article }: { article: NightArchiveArticle }) {
  const headings = article.sections.map((section, index) => ({
    id: `${article.slug}-${index + 1}`,
    text: section.heading ?? `Section ${index + 1}`,
    level: 2,
  }));

  return <>
    <a className="night-back" href="/blog">← Night Archive</a>
    <CanonicalMarkup html={renderPageHeader({ kicker: article.file, title: article.title, lede: article.standfirst })} />
    <aside className="night-disclosure" role="note">
      <strong>{article.genre === "reported memoir" ? "Editorial method:" : "Fiction:"}</strong>{" "}
      {article.disclosure ?? "This story uses supernatural and surveillance imagery as metaphor. It does not describe verified events or people."}
    </aside>
    <tt-article-reader article-title={article.title} reading-minutes={String(article.readingMinutes)} headings={JSON.stringify(headings)} />
    <CanonicalMarkup html={renderArticle(articleBody(article))} className="night-article" />
  </>;
}

export default function App() {
  const slug = window.location.pathname.match(/^\/blog\/([^/]+)\/?$/)?.[1];
  const article = slug ? articles.find((candidate) => candidate.slug === slug) : undefined;

  useEffect(() => {
    document.title = article ? `${article.title} — Ghost Signal` : "Night Archive — Ghost Signal";
    let description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!description) {
      description = document.createElement("meta");
      description.name = "description";
      document.head.append(description);
    }
    description.content = article?.standfirst ?? "Reported memoir and speculative stories from the Ghost Signal Night Archive.";
  }, [article]);

  return <>
    <style>{themeCss}</style>
    <style>{WIDGET_CSS}</style>
    <style>{MEDIA_CSS}</style>
    <a className="tt-skip" href="#main">Skip to content</a>
    <CanonicalMarkup html={nav} />
    <main id="main" className="tt-shell night-shell">
      {slug ? (article ? <ArticlePage article={article} /> : <NotFound />) : <ArchiveIndex />}
    </main>
  </>;
}

function NotFound() {
  return <CanonicalMarkup html={renderPageHeader({ kicker: "404 // LOST TRANSMISSION", title: "This file was never recovered.", lede: "Return to the Night Archive and choose another signal." })} />;
}
