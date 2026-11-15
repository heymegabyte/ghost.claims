import type { HTMLAttributes } from "react";
import { renderCustomElementShadowDom } from "@theme.tools/blog/elements";

export function CanonicalMarkup({ html, ...props }: { html: string } & HTMLAttributes<HTMLDivElement>) {
  return <div {...props} dangerouslySetInnerHTML={{ __html: html }} />;
}

class ArticleReaderElement extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute("article-title") ?? "Article";
    const readingTimeMinutes = Number(this.getAttribute("reading-minutes") ?? "1");
    const headings = JSON.parse(this.getAttribute("headings") ?? "[]") as Array<{ id: string; text: string; level: number }>;
    const root = this.shadowRoot ?? this.attachShadow({ mode: "open" });
    root.innerHTML = renderCustomElementShadowDom({ title, readingTimeMinutes, headings });
  }
}

export function registerThemeToolsElements() {
  if (!customElements.get("tt-article-reader")) customElements.define("tt-article-reader", ArticleReaderElement);
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "tt-article-reader": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        "article-title": string;
        "reading-minutes": string;
        headings: string;
      };
    }
  }
}
