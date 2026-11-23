import { extractHeadings, readingMinutes, renderMarkdown } from "@theme.tools/blog/markdown";
import {
  renderArticle,
  renderBackToTop,
  renderBreadcrumb,
  renderCoverStory,
  renderEditorsNote,
  renderEvidenceBadge,
  renderJournalNotice,
  renderMasthead,
  renderPageHeader,
  renderPostGrid,
  renderReadingProgress,
  renderShareRow,
  renderSourceLibrary,
  renderTableOfContents,
  renderTagList,
  installImageLightbox,
} from "@theme.tools/blog/site";
import { renderComponent } from "@theme.tools/blog/components-registry";
import { useEffect } from "react";
import { articles, canonicalPosts, type CanonicalBlogPost, type NightArchiveArticle } from "./content";
import { CanonicalMarkup } from "./theme-tools";
import { GHOST_SIGNAL_SHELL_CSS, renderGhostSignalFooter, renderGhostSignalNav, renderGhostSignalSkipLink } from "../../src/site-shell";
import "./app.css";

const nav = renderGhostSignalNav("/blog");

function articleBody(article: NightArchiveArticle): string {
  const html = article.sections.map((section, sectionIndex) => {
    const id = `${article.slug}-${sectionIndex + 1}`;
    const isSources = section.heading?.startsWith("Sources and further") ?? false;
    if (isSources) {
      return renderArticleSourceLibrary(section.heading ?? "Sources and further reading", id, section.paragraphs);
    }
    const heading = section.heading ? `<h2 id="${id}">${section.heading}</h2>` : "";
    const paragraphs = section.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("");
    const quote = section.quote ? `<blockquote>${section.quote}</blockquote>` : "";
    const components = section.components?.map((component) => {
      if (component.type === "field-video") return renderFieldVideo(component.data);
      return renderComponent(component.type, component.data);
    }).join("") ?? "";
    return `<section>${heading}${paragraphs}${quote}${components}</section>`;
  }).join("");
  return html.replace(/<img(?![^>]*data-tt-zoom)/g, '<img data-tt-zoom');
}

function renderFieldVideo(data: unknown): string {
  const video = data as { src: string; poster: string; title: string; caption: string };
  return `<figure class="journal-field-video">
    <video controls playsinline preload="none" poster="${video.poster}" aria-label="${video.title}">
      <source src="${video.src}" type="video/mp4" />
      <a href="${video.src}">Open ${video.title}</a>
    </video>
    <figcaption>${video.caption}</figcaption>
  </figure>`;
}

function renderArticleSourceLibrary(heading: string, headingId: string, sources: readonly string[]): string {
  const items = sources.map((source) => {
    const href = source.match(/href="([^"]+)"/)?.[1];
    let domain = "Referenced archive";
    if (href) {
      try { domain = new URL(href).hostname.replace(/^www\./, ""); } catch { /* retain archive label */ }
    }
    const html = source
      .replace(/^<span([^>]*)>/, "<div$1>")
      .replace(/<\/span>$/, "</div>")
      .replace(/<\/a>\.<\/div>$/, "</a></div>");
    return { html, domain };
  });

  return renderSourceLibrary({
    heading,
    headingId,
    eyebrow: "Documentation // verified trails",
    introduction: "Primary records, public agencies, trail stewards, and historical archives behind this field note.",
    items,
    returnHref: "#main",
    returnLabel: "Return to the transmission",
  });
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
    })} />
    <CanonicalMarkup html={renderCoverStory({
      kicker: "SYSTEM DOSSIER // ARCHITECTURE & ENGINEERING",
      title: cover.title,
      dek: cover.description,
      byline: cover.author,
      meta: `${cover.date} · ${readingMinutes(cover.body)} min read`,
      href: `/blog/${cover.slug}`,
      image: { src: "/evidence-radiation-tdr.webp", alt: "Sensor telemetry display glowing against a dark field" },
      cta: "Open the dossier →",
    })} />
    <CanonicalMarkup html={renderEditorsNote({
      kicker: "FROM THE ARCHIVE",
      heading: "One signal, two frequencies.",
      body: "<p>The journal now brings the technical record and the Night Archive together: documented systems beside reported memory, cultural criticism, and speculative horror. The formats differ; the editorial promise does not—state what is known, label what is remembered, and never disguise metaphor as evidence.</p>",
      signature: "— Ghost Signal",
    })} />
    <CanonicalMarkup html={renderPageHeader({
      kicker: "NIGHT ARCHIVE // FILES RECOVERED AFTER MIDNIGHT",
      title: "Stories for the watched.",
      lede: "Reported memory and speculative stories about systems that watch, rank, rehearse, and consume us—until spectacle feels like fate.",
    })} />
    <CanonicalMarkup html={renderJournalNotice({
      label: "Editorial note:",
      body: "Night Archive is speculative horror and cultural criticism. Its cosmic forces, conspiracies, and characters are fictional metaphors, not claims about real people or events.",
    })} />
    <CanonicalMarkup html={cards} />
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

  return html.replace(/<img(?![^>]*data-tt-zoom)/g, '<img data-tt-zoom');
}

function CanonicalArticlePage({ post }: { post: CanonicalBlogPost }) {
  const headings = extractHeadings(post.body);
  const meta = `${post.date} · ${readingMinutes(post.body)} min read · ${post.difficulty}`;

  return <>
    <CanonicalMarkup html={renderReadingProgress()} />
    <CanonicalMarkup className="journal-reading-rail" html={renderBreadcrumb({ items: [
      { label: "Ghost Signal", href: "/" },
      { label: "Journal", href: "/blog" },
      { label: post.title },
    ] })} />
    <CanonicalMarkup className="journal-reading-rail journal-technical-header" html={renderPageHeader({ kicker: `${post.desk.toUpperCase()} // ${post.format.toUpperCase()} // ${meta}`, title: post.title, lede: post.description })} />
    <div className="journal-article-tools journal-reading-rail">
      <CanonicalMarkup html={renderEvidenceBadge(post.evidence)} />
      <CanonicalMarkup html={renderTagList({ tags: post.tags, label: "Filed under" })} />
    </div>
    <CanonicalMarkup className="journal-reading-rail" html={renderTableOfContents({ headings, label: "Inside this dossier" })} />
    <CanonicalMarkup html={renderArticle(renderCanonicalBody(post))} className="tt-journal__article journal-technical-article" />
    <CanonicalMarkup className="journal-reading-rail" html={renderShareRow({ url: `https://ghost.claims/blog/${post.slug}`, title: post.title, label: "Transmit this dossier" })} />
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
    <a className="tt-back" href="/blog">← Ghost Signal Journal</a>
    <CanonicalMarkup className="journal-reading-rail" html={renderPageHeader({ kicker: article.file, title: article.title, lede: article.standfirst })} />
    <CanonicalMarkup className="journal-reading-rail" html={renderJournalNotice({
      label: article.genre === "reported memoir" ? "Editorial method:" : "Fiction:",
      body: article.disclosure ?? "This story uses supernatural and surveillance imagery as metaphor. It does not describe verified events or people.",
    })} />
    <tt-article-reader article-title={article.title} reading-minutes={String(article.readingMinutes)} headings={JSON.stringify(headings)} />
    {article.slug === "greystone-after-the-skunk" ? <CanonicalMarkup html={renderComponent("audio-narration", {
      audioUrl: "/blog-media/greystone/greystone-after-the-skunk-audio-briefing.mp3",
      title: "Greystone After the Skunk — audio briefing",
      narratorName: "Ghost Signal synthesized voice",
      durationFormatted: "3 min listen",
      transcriptUrl: "/blog-media/greystone/greystone-after-the-skunk-audio-briefing.txt",
      downloadUrl: "/blog-media/greystone/greystone-after-the-skunk-audio-briefing.mp3",
    })} className="journal-audio-briefing" /> : null}
    <CanonicalMarkup html={renderArticle(articleBody(article))} className="tt-journal__article" />
  </>;
}

export default function App() {
  const slug = window.location.pathname.match(/^\/blog\/([^/]+)\/?$/)?.[1];
  const article = slug ? articles.find((candidate) => candidate.slug === slug) : undefined;
  const canonicalPost = slug ? canonicalPosts.find((candidate) => candidate.slug === slug) : undefined;

  useEffect(() => {
    document.title = article ? `${article.title} — Ghost Signal` : canonicalPost ? `${canonicalPost.title} — Ghost Signal` : "Ghost Signal Journal — Night Archive";
    let description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!description) {
      description = document.createElement("meta");
      description.name = "description";
      document.head.append(description);
    }
    description.content = article?.standfirst ?? canonicalPost?.description ?? "Field reports, strange histories, systems dossiers, and speculative stories from Ghost Signal.";

    const canonicalUrl = slug ? `https://ghost.claims/blog/${slug}` : "https://ghost.claims/blog";
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.append(canonical);
    }
    canonical.href = canonicalUrl;

    const setSocialMeta = (property: string, content: string) => {
      let meta = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("property", property);
        document.head.append(meta);
      }
      meta.content = content;
    };
    setSocialMeta("og:title", article?.title ?? canonicalPost?.title ?? "Ghost Signal Journal");
    setSocialMeta("og:description", description.content);
    setSocialMeta("og:url", canonicalUrl);
    setSocialMeta("og:type", slug ? "article" : "website");
    if (article?.slug === "greystone-after-the-skunk") setSocialMeta("og:image", "https://ghost.claims/blog-media/greystone/greystone-memory-study.webp");

    document.getElementById("tt-article-jsonld")?.remove();
    if (article) {
      const structuredData = document.createElement("script");
      structuredData.id = "tt-article-jsonld";
      structuredData.type = "application/ld+json";
      structuredData.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        description: article.standfirst,
        author: { "@type": "Person", name: "Brian Zalewski" },
        publisher: { "@type": "Organization", name: "Ghost Signal", url: "https://ghost.claims" },
        mainEntityOfPage: canonicalUrl,
        image: article.slug === "greystone-after-the-skunk" ? "https://ghost.claims/blog-media/greystone/greystone-memory-study.webp" : undefined,
        associatedMedia: article.slug === "greystone-after-the-skunk" ? {
          "@type": "AudioObject",
          name: "Greystone After the Skunk — audio briefing",
          contentUrl: "https://ghost.claims/blog-media/greystone/greystone-after-the-skunk-audio-briefing.mp3",
          duration: "PT3M13S",
          transcript: "https://ghost.claims/blog-media/greystone/greystone-after-the-skunk-audio-briefing.txt",
        } : undefined,
      });
      document.head.append(structuredData);
    }
  }, [article, canonicalPost]);

  useEffect(() => installImageLightbox(document), [article, canonicalPost]);

  return <>
    <style>{GHOST_SIGNAL_SHELL_CSS}</style>
    <CanonicalMarkup html={renderGhostSignalSkipLink()} />
    <CanonicalMarkup html={nav} />
    <main id="main" className="tt-journal">
      {slug ? (article ? <ArticlePage article={article} /> : canonicalPost ? <CanonicalArticlePage post={canonicalPost} /> : <NotFound />) : <ArchiveIndex />}
    </main>
    <CanonicalMarkup html={renderGhostSignalFooter()} />
  </>;
}

function NotFound() {
  return <CanonicalMarkup html={renderPageHeader({ kicker: "404 // LOST TRANSMISSION", title: "This file was never recovered.", lede: "Return to the Night Archive and choose another signal." })} />;
}
