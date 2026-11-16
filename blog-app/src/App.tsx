import { renderArticle, renderPageHeader, renderPostGrid } from "@theme.tools/blog/site";
import { renderComponent } from "@theme.tools/blog/components-registry";
import { useEffect } from "react";
import { articles, type NightArchiveArticle } from "./content";
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
    <style>{GHOST_SIGNAL_SHELL_CSS}</style>
    <CanonicalMarkup html={renderGhostSignalSkipLink()} />
    <CanonicalMarkup html={nav} />
    <main id="main" className="tt-shell night-shell">
      {slug ? (article ? <ArticlePage article={article} /> : <NotFound />) : <ArchiveIndex />}
    </main>
    <CanonicalMarkup html={renderGhostSignalFooter()} />
  </>;
}

function NotFound() {
  return <CanonicalMarkup html={renderPageHeader({ kicker: "404 // LOST TRANSMISSION", title: "This file was never recovered.", lede: "Return to the Night Archive and choose another signal." })} />;
}
