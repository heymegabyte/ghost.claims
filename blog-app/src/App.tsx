import { extractHeadings, readingMinutes, renderMarkdown } from "@theme.tools/blog/markdown";
import {
  renderArticle,
  renderBackToTop,
  renderBreadcrumb,
  renderCoverStory,
  renderEditorsNote,
  renderEvidenceBadge,
  renderMasthead,
  renderPageHeader,
  renderPostGrid,
  renderReadingProgress,
  renderShareRow,
  renderTableOfContents,
  renderTagList,
} from "@theme.tools/blog/site";
import { renderComponent } from "@theme.tools/blog/components-registry";
import { useEffect } from "react";
import { articles, canonicalPosts, type CanonicalBlogPost, type NightArchiveArticle } from "./content";
import { CanonicalMarkup } from "./theme-tools";
import { GHOST_SIGNAL_SHELL_CSS, renderGhostSignalFooter, renderGhostSignalNav, renderGhostSignalSkipLink } from "../../src/site-shell";
import "./app.css";

const nav = renderGhostSignalNav("/blog");

function articleBody(article: NightArchiveArticle): string {
  return article.sections.map((section, sectionIndex) => {
    const id = `${article.slug}-${sectionIndex + 1}`;
    const isSources = section.heading?.startsWith("Sources and further") ?? false;
    const heading = section.heading ? `<h2 id="${id}">${section.heading}</h2>` : "";
    const paragraphs = isSources
      ? renderSourceLibrary(section.paragraphs)
      : section.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("");
    const quote = section.quote ? `<blockquote>${section.quote}</blockquote>` : "";
    const components = section.components?.map((component) => renderComponent(component.type, component.data)).join("") ?? "";
    return `<section${isSources ? ' class="night-sources" aria-labelledby="' + id + '"' : ""}>${heading}${paragraphs}${quote}${components}</section>`;
  }).join("");
}

function renderSourceLibrary(sources: readonly string[]): string {
  const cards = sources.map((source) => {
    const href = source.match(/href="([^"]+)"/)?.[1];
    const host = href ? new URL(href).hostname.replace(/^www\./, "") : "Referenced archive";
    const content = source
      .replace(/^<span([^>]*)>/, "<div$1>")
      .replace(/<\/span>$/, "</div>")
      .replace(/<\/a>\.<\/div>$/, "</a></div>");
    return `<li class="night-source-card">${content}<span class="night-source-domain">${host}</span><span class="night-source-arrow" aria-hidden="true">↗</span></li>`;
  }).join("");

  return `<div class="night-sources__masthead"><p class="night-sources__eyebrow">DOCUMENTATION // VERIFIED TRAILS</p><p class="night-sources__intro">Primary records, public agencies, trail stewards, and historical archives behind this field note.</p><span class="night-sources__count" aria-label="${sources.length} references"><strong>${String(sources.length).padStart(2, "0")}</strong> references</span></div><ol class="night-source-list">${cards}</ol><a class="night-sources__return" href="#main">Return to the transmission <span aria-hidden="true">↑</span></a>`;
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

  const cover = canonicalPosts[0];

  return <>
    <CanonicalMarkup html={renderMasthead({
      title: "GHOST SIGNAL JOURNAL",
      tagline: "Field reports, strange histories, and systems observed after dark.",
      meta: "EST. 2026 · NEW JERSEY · SIX TRANSMISSIONS RECOVERED",
    })} className="journal-masthead" />
    <CanonicalMarkup html={renderCoverStory({
      kicker: "SYSTEM DOSSIER // ARCHITECTURE & ENGINEERING",
      title: cover.title,
      dek: cover.description,
      byline: cover.author,
      meta: `${cover.date} · ${readingMinutes(cover.body)} min read`,
      href: `/blog/${cover.slug}`,
      image: { src: "/evidence-radiation-tdr.webp", alt: "Sensor telemetry display glowing against a dark field" },
      cta: "Open the dossier →",
    })} className="journal-cover" />
    <CanonicalMarkup html={renderEditorsNote({
      kicker: "FROM THE ARCHIVE",
      heading: "One signal, two frequencies.",
      body: "<p>The journal now brings the technical record and the Night Archive together: documented systems beside reported memory, cultural criticism, and speculative horror. The formats differ; the editorial promise does not—state what is known, label what is remembered, and never disguise metaphor as evidence.</p>",
      signature: "— Ghost Signal",
    })} className="journal-note" />
    <CanonicalMarkup html={renderPageHeader({
      kicker: "NIGHT ARCHIVE // FILES RECOVERED AFTER MIDNIGHT",
      title: "Stories for the watched.",
      lede: "Reported memory and speculative stories about systems that watch, rank, rehearse, and consume us—until spectacle feels like fate.",
    })} className="journal-archive-heading" />
    <aside className="night-disclosure" role="note"><strong>Editorial note:</strong> Night Archive is speculative horror and cultural criticism. Its cosmic forces, conspiracies, and characters are fictional metaphors, not claims about real people or events.</aside>
    <CanonicalMarkup html={cards} className="night-grid" />
  </>;
}

function renderCanonicalBody(post: CanonicalBlogPost): string {
  let html = renderMarkdown(post.body);

  for (const figure of post.figures) {
    const figureMarkup = `<figure class="journal-figure">${figure.svg}<figcaption>${figure.caption}</figcaption></figure>`;
    html = html.replace(`<p>{{figure:${figure.id}}}</p>`, figureMarkup);
  }

  for (const widget of post.widgets) {
    const data = widget.type === "featured"
      ? { ...(widget.data as Record<string, unknown>), src: "/evidence-radiation-tdr.webp" }
      : widget.data;
    html = html.replace(`<p>{{widget:${widget.id}}}</p>`, renderComponent(widget.type, data));
  }

  return html;
}

function CanonicalArticlePage({ post }: { post: CanonicalBlogPost }) {
  const headings = extractHeadings(post.body);
  const meta = `${post.date} · ${readingMinutes(post.body)} min read · ${post.difficulty}`;

  return <>
    <CanonicalMarkup html={renderReadingProgress()} />
    <CanonicalMarkup html={renderBreadcrumb({ items: [
      { label: "Ghost Signal", href: "/" },
      { label: "Journal", href: "/blog" },
      { label: post.title },
    ] })} />
    <CanonicalMarkup html={renderPageHeader({ kicker: `${post.desk.toUpperCase()} // ${post.format.toUpperCase()} // ${meta}`, title: post.title, lede: post.description })} />
    <div className="journal-article-tools">
      <CanonicalMarkup html={renderEvidenceBadge(post.evidence)} />
      <CanonicalMarkup html={renderTagList({ tags: post.tags, label: "Filed under" })} />
    </div>
    <CanonicalMarkup html={renderTableOfContents({ headings, label: "Inside this dossier" })} />
    <CanonicalMarkup html={renderArticle(renderCanonicalBody(post))} className="night-article journal-technical-article" />
    <CanonicalMarkup html={renderShareRow({ url: `https://ghost.claims/blog/${post.slug}`, title: post.title, label: "Transmit this dossier" })} />
    <CanonicalMarkup html={renderBackToTop()} />
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
  const canonicalPost = slug ? canonicalPosts.find((candidate) => candidate.slug === slug) : undefined;

  useEffect(() => {
    document.title = article ? `${article.title} — Ghost Signal` : canonicalPost ? `${canonicalPost.title} — Ghost Signal` : "Ghost Signal Journal";
    let description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!description) {
      description = document.createElement("meta");
      description.name = "description";
      document.head.append(description);
    }
    description.content = article?.standfirst ?? canonicalPost?.description ?? "Field reports, strange histories, systems dossiers, and speculative stories from Ghost Signal.";
  }, [article, canonicalPost]);

  return <>
    <style>{GHOST_SIGNAL_SHELL_CSS}</style>
    <CanonicalMarkup html={renderGhostSignalSkipLink()} />
    <CanonicalMarkup html={nav} />
    <main id="main" className="tt-shell night-shell">
      {slug ? (article ? <ArticlePage article={article} /> : canonicalPost ? <CanonicalArticlePage post={canonicalPost} /> : <NotFound />) : <ArchiveIndex />}
    </main>
    <CanonicalMarkup html={renderGhostSignalFooter()} />
  </>;
}

function NotFound() {
  return <CanonicalMarkup html={renderPageHeader({ kicker: "404 // LOST TRANSMISSION", title: "This file was never recovered.", lede: "Return to the Night Archive and choose another signal." })} />;
}
