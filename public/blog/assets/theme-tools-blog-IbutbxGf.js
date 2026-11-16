function e(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#039;`)}var t=e,n=0;function r(e,n,r){if(!e.items||e.items.length===0)throw Error(`Nav mega-menu group "${e.label}" requires a non-empty items array.`);let i=`${n}-p${r}`,a=`${n}-t${r}`,o=e.featured,s=e.icon?`<span class="tt-nav__mm-ic" aria-hidden="true">${t(e.icon)}</span>`:``,c=e.href?`<a class="tt-nav__mm-labellink" href="${t(e.href)}" tabindex="-1">${t(e.label)}</a>`:`<span>${t(e.label)}</span>`,l=e.items.map(e=>{let n=e.sub?`<span class="tt-nav__mm-itemsub">${t(e.sub)}</span>`:``;return`<li role="none"><a class="tt-nav__mm-item" role="menuitem" href="${t(e.href)}" tabindex="-1"><span class="tt-nav__mm-itemlabel">${t(e.label)}</span>${n}<span class="tt-nav__mm-arrow" aria-hidden="true">→</span></a></li>`}).join(``),u=e.blurb?`<p class="tt-nav__mm-blurb">${t(e.blurb)}</p>`:``,d=o.kicker?`<span class="tt-nav__mm-fkicker">${t(o.kicker)}</span>`:``;return`<li class="tt-nav__mm-group" role="none">
      <button type="button" id="${a}" class="tt-nav__mm-trigger" role="menuitem" aria-haspopup="true" aria-expanded="false" aria-controls="${i}" data-tt-nav-trigger="${r}" tabindex="${r===0?`0`:`-1`}">${s}${c}<svg class="tt-nav__mm-chev" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" focusable="false"><path d="M1 3l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
      <div class="tt-nav__mm-panel" id="${i}" role="region" aria-labelledby="${a}" data-tt-nav-panel="${r}">
        <div class="tt-nav__mm-grid">
          <div class="tt-nav__mm-col">
            ${u}
            <ul class="tt-nav__mm-list" role="menu" aria-label="${t(e.label)}">${l}</ul>
          </div>
          <a class="tt-nav__mm-featured" href="${t(o.href)}" tabindex="-1" aria-label="${t(o.title)}">
            <img class="tt-nav__mm-fimg" src="${t(o.src)}" alt="${t(o.alt)}" loading="lazy" decoding="async" width="480" height="270">
            <span class="tt-nav__mm-fscrim">${d}<span class="tt-nav__mm-ftitle">${t(o.title)}</span></span>
          </a>
        </div>
      </div>
    </li>`}function i(e,n){let r=e.featured,i=e.icon?`<span class="tt-ov__card-ic" aria-hidden="true">${t(e.icon)}</span>`:``,a=e.blurb?`<span class="tt-ov__card-blurb">${t(e.blurb)}</span>`:``,o=e.href??r.href,s=e.items.length,c=s>0?`<span class="tt-ov__card-count" aria-hidden="true">${s}</span><span class="tt-sr-only"> — ${s} article${s===1?``:`s`}</span>`:``;return`<a class="tt-ov__card" role="menuitem" href="${t(o)}" data-tt-ov-card="${n}" data-tt-ov-fsrc="${t(r.src)}" data-tt-ov-falt="${t(r.alt)}" data-tt-ov-fhref="${t(r.href)}" data-tt-ov-ftitle="${t(r.title)}" data-tt-ov-fkicker="${t(r.kicker??e.label)}" tabindex="-1">
      <span class="tt-ov__card-head">${i}<span class="tt-ov__card-name">${t(e.label)}</span>${c}</span>
      ${a}
    </a>`}function a(e,n){let r=e.mega??[],a=`${n}-ov`,o=`${n}-ovt`,s=e.megaTriggerLabel&&e.megaTriggerLabel.trim()?e.megaTriggerLabel:`Explore`,c=r[0],l=e.megaSearch,u=l?.name&&l.name.trim()?l.name:`q`,d=l?`<form class="tt-ov__search" role="search" method="get" action="${t(l.action)}">
        <span class="tt-ov__search-ic" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="5.2" stroke="currentColor" stroke-width="1.6"/><path d="M12 12l3.5 3.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg></span>
        <input class="tt-ov__search-input" type="search" name="${t(u)}" placeholder="${t(l.placeholder??`Search the magazine…`)}" aria-label="${t(l.placeholder??`Search the magazine`)}" autocomplete="off" data-tt-ov-search>
        <button class="tt-ov__search-go" type="submit">Search</button>
      </form>`:``,f=l?`<a class="tt-nav__ov-search" href="${t(l.action)}" aria-label="Search" data-tt-ov-searchbtn>
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="5.2" stroke="currentColor" stroke-width="1.7"/><path d="M12 12l3.6 3.6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>
  </a>`:``,p=r.map((e,t)=>i(e,t)).join(`
          `),m=c?`<a class="tt-ov__featured" href="${t(c.featured.href)}" data-tt-ov-featured aria-label="${t(c.featured.title)}" data-tt-ov-flabel="${t(c.featured.title)}">
          <span class="tt-ov__fmedia">
            <img class="tt-ov__fimg" src="${t(c.featured.src)}" alt="${t(c.featured.alt)}" loading="lazy" decoding="async" width="520" height="300" data-tt-ov-fimg>
            <span class="tt-ov__fscrim">
              <span class="tt-ov__fkicker" data-tt-ov-fkicker>${t(c.featured.kicker??c.label)}</span>
              <span class="tt-ov__fcue" aria-hidden="true">Read the story →</span>
            </span>
          </span>
          <span class="tt-ov__ftitle" data-tt-ov-ftitle>${t(c.featured.title)}</span>
        </a>`:``,h=e.megaLatest,g=h&&h.items.length>0?`<div class="tt-ov__latest">
          <p class="tt-ov__col-label">${t(h.title??`Latest`)}</p>
          <ul class="tt-ov__latest-list" role="menu" aria-label="${t(h.title??`Latest articles`)}">
            ${h.items.map(e=>`<li role="none"><a class="tt-ov__latest-item" role="menuitem" href="${t(e.href)}" tabindex="-1"><span class="tt-ov__latest-title">${t(e.label)}</span>${e.meta?`<span class="tt-ov__latest-meta">${t(e.meta)}</span>`:``}</a></li>`).join(`
            `)}
          </ul>
        </div>`:``,_=e.megaCta,v=_?`<a class="tt-ov__cta" href="${t(_.href)}" data-tt-ov-link>
          <span class="tt-ov__cta-kicker">${t(_.kicker)}</span>
          <span class="tt-ov__cta-title">${t(_.title)}</span>
          <span class="tt-ov__cta-blurb">${t(_.blurb)}</span>
          <span class="tt-ov__cta-go">${t(_.cta??`Start here →`)}</span>
        </a>`:``,y=e.megaQuick,b=y&&y.items.length>0?`<div class="tt-ov__quick">
          ${y.title?`<p class="tt-ov__col-label">${t(y.title)}</p>`:``}
          <ul class="tt-ov__quick-list" role="menu" aria-label="${t(y.title??`Quick links`)}">
            ${y.items.map(e=>`<li role="none"><a class="tt-ov__quick-item" role="menuitem" href="${t(e.href)}" tabindex="-1">${e.icon?`<span class="tt-ov__quick-ic" aria-hidden="true">${t(e.icon)}</span>`:``}<span class="tt-ov__quick-label">${t(e.label)}</span>${e.sub?`<span class="tt-ov__quick-sub">${t(e.sub)}</span>`:``}</a></li>`).join(`
            `)}
          </ul>
        </div>`:``,x=v||b?`<div class="tt-ov__rail">${v}${b}</div>`:``,S=c?c.href??c.featured.href:`/`;return`<button type="button" id="${o}" class="tt-nav__ov-trigger" aria-haspopup="dialog" aria-expanded="false" aria-controls="${a}" data-tt-ov-trigger>
    <span class="tt-nav__ov-grid" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
    <span class="tt-nav__ov-label">${t(s)}</span>
    <svg class="tt-nav__ov-chev" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" focusable="false"><path d="M1 3l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
  </button>
  <noscript><a class="tt-nav__ov-nojs" href="${t(S)}">${t(s)}</a></noscript>${f}
  <div class="tt-ov" id="${a}" role="dialog" aria-modal="true" aria-label="${t(e.megaLabel&&e.megaLabel.trim()?e.megaLabel:`Explore the magazine`)}" data-tt-ov-panel hidden>
    <div class="tt-ov__scrim" data-tt-ov-scrim></div>
    <div class="tt-ov__sheet" role="document">
      <div class="tt-ov__top">
        ${d}
        <button type="button" class="tt-ov__close" data-tt-ov-close aria-label="Close menu"><svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 3l10 10M13 3L3 13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></button>
      </div>
      <div class="tt-ov__body">
        <nav class="tt-ov__desks" aria-label="Desks">
          <p class="tt-ov__col-label">All 12 desks</p>
          <div class="tt-ov__grid" role="menu" aria-label="Desks">
          ${p}
          </div>
        </nav>
        <div class="tt-ov__aside">
          ${m}
          ${g}
        </div>
        ${x}
      </div>
    </div>
  </div>`}function o(e){let i=e.brandHref??`/`,o=e.links.map(e=>`<a class="tt-nav__link${e.cta?` tt-nav__cta`:``}" href="${t(e.href)}">${t(e.label)}</a>`).join(``),c=!!(e.mega&&e.mega.length>0);if(c&&e.megaMode===`overlay`){n+=1;let r=`ttnav-${n.toString(36)}`,c=a(e,r);return`<header class="tt-nav tt-nav--overlay" data-tt-nav-root data-tt-nav-uid="${r}">
  <a class="tt-nav__brand" href="${t(i)}" aria-label="${t(e.brand)} home">
    <span class="tt-nav__mark" aria-hidden="true"></span>
    <span class="tt-nav__word">${t(e.brand)}</span>
  </a>
  <div class="tt-nav__actions">
    ${c}
    <nav class="tt-nav__links">${o}${e.themeToggle?s():``}</nav>
  </div>
</header>`}let l=``;if(c){n+=1;let i=`ttnav-${n.toString(36)}`,a=(e.mega??[]).map((e,t)=>r(e,i,t)).join(`
      `);l=`
  <button type="button" class="tt-nav__burger" aria-expanded="false" aria-controls="${i}-bar" data-tt-nav-burger aria-label="Open menu">
    <span class="tt-nav__burger-box" aria-hidden="true"><span class="tt-nav__burger-line"></span></span>
  </button>
  <nav class="tt-nav__mm" aria-label="${t(e.megaLabel&&e.megaLabel.trim()?e.megaLabel:`Primary`)}" data-tt-nav-root data-tt-nav-uid="${i}">
    <ul class="tt-nav__mm-bar" id="${i}-bar" role="menubar">
      ${a}
    </ul>
  </nav>`}return`<header class="tt-nav${c?` tt-nav--mega`:``}">
  <a class="tt-nav__brand" href="${t(i)}" aria-label="${t(e.brand)} home">
    <span class="tt-nav__mark" aria-hidden="true"></span>
    <span class="tt-nav__word">${t(e.brand)}</span>
  </a>${l}
  <nav class="tt-nav__links">${o}${e.themeToggle?s():``}</nav>
</header>`}function s(){return`<button class="tt-theme-toggle" type="button" data-tt-theme-toggle aria-pressed="false" aria-label="Switch to light reading mode" title="Light / dark reading mode">
  <span class="tt-theme-toggle__icon" aria-hidden="true"></span>
</button>`}function c(e){let n=e.image?`<img class="tt-post__thumb" src="${t(e.image.src)}" alt="${t(e.image.alt)}" loading="lazy" decoding="async" width="1200" height="630">`:``,r=e.tag?`<span class="tt-post__tag">${t(e.tag)}</span>`:``,i=e.meta?`<div class="tt-post__meta">${t(e.meta)}</div>`:``;return`<a class="tt-post" href="${t(e.href)}">
  ${n}
  ${r}
  <h3 class="tt-post__title">${t(e.title)}</h3>
  <p class="tt-post__desc">${t(e.description)}</p>
  ${i}
</a>`}function l(e){return`<div class="tt-posts">
${e.posts.map(c).join(`
`)}
</div>`}function u(e){let n=e.kicker?`<span class="tt-kicker">${t(e.kicker)}</span>`:``,r=e.lede?`<p class="tt-lede">${t(e.lede)}</p>`:``;return`<header class="tt-pagehead">
  ${n}
  <h1 class="tt-pagehead__title">${t(e.title)}</h1>
  ${r}
</header>`}function d(e){return`<article class="tt-article">${e}</article>`}function f(){return`<a class="tt-skip" href="#tt-main">Skip to content</a>`}function p(e){let n=e.links.map(e=>`<a href="${t(e.href)}">${t(e.label)}</a>`).join(``);return`<footer class="tt-footer">
  <div class="tt-footer__row">
    <div class="tt-footer__note">${t(e.note)}</div>
    <nav class="tt-footer__links">${n}</nav>
  </div>
</footer>`}var m=[`callout`,`takeaways`,`comparison`,`steps`,`faq`,`timeline`,`stat-cards`,`pros-cons`,`glossary`,`pullquote`,`platform-tabs`,`spec-table`,`scorecard`,`accordion`];function h(e){return m.includes(e)}var g=[`featured`,`gallery`,`video-browser`];[...m,...g];var _=class extends Error{constructor(e){super(e),this.name=`WidgetError`}};function v(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#039;`)}function y(e){return typeof e==`object`&&!!e&&!Array.isArray(e)}function b(e,t,n){let r=e[t];if(typeof r!=`string`||r.trim()===``)throw new _(`${n}: field "${t}" must be a non-empty string`);return r}function x(e,t){let n=e[t];return typeof n==`string`&&n.trim()!==``?n:void 0}function S(e,t,n){let r=e[t];if(typeof r!=`number`||!Number.isFinite(r))throw new _(`${n}: field "${t}" must be a finite number`);return r}function ee(e,t){let n=e[t];return typeof n==`number`&&Number.isFinite(n)?n:void 0}function C(e,t,n){let r=e[t];if(!Array.isArray(r)||r.length===0)throw new _(`${n}: field "${t}" must be a non-empty array`);return r.map((e,r)=>{if(typeof e!=`string`||e.trim()===``)throw new _(`${n}: "${t}[${r}]" must be a non-empty string`);return e})}function w(e,t,n){let r=e[t];if(!Array.isArray(r)||r.length===0)throw new _(`${n}: field "${t}" must be a non-empty array`);return r.map((e,r)=>{if(!y(e))throw new _(`${n}: "${t}[${r}]" must be an object`);return e})}function T(e,t){if(!y(e))throw new _(`${t}: data must be an object`);return e}var E=[`info`,`warning`,`success`,`tip`],D={info:`Info`,warning:`Warning`,success:`Success`,tip:`Tip`};function te(e){let t=`callout`,n=T(e,t),r=b(n,`variant`,t);if(!E.includes(r))throw new _(`${t}: "variant" must be one of ${E.join(`, `)}`);let i=r,a=b(n,`title`,t),o=b(n,`body`,t);return`
<aside class="tt-widget tt-callout tt-callout--${i}" data-ripple="true" data-spotlight="true" data-magnetic="true" role="note" aria-label="${v(D[i])}: ${v(a)}">
  <span class="tt-callout__badge" aria-hidden="true">${v(D[i])}</span>
  <div class="tt-callout__content">
    <p class="tt-callout__title">${v(a)}</p>
    <p class="tt-callout__body">${v(o)}</p>
  </div>
</aside>`.trim()}function O(e){let t=`takeaways`,n=T(e,t),r=b(n,`title`,t),i=C(n,`items`,t).map(e=>`    <li class="tt-takeaways__item">${v(e)}</li>`).join(`
`);return`
<section class="tt-widget tt-takeaways" data-ripple="true" data-spotlight="true" data-magnetic="true" aria-label="${v(r)}">
  <h3 class="tt-widget__heading tt-takeaways__heading">${v(r)}</h3>
  <ul class="tt-takeaways__list">
${i}
  </ul>
</section>`.trim()}function k(e){let t=`comparison`,n=T(e,t),r=b(n,`title`,t),i=C(n,`columns`,t),a=n.rows;if(!Array.isArray(a)||a.length===0)throw new _(`${t}: field "rows" must be a non-empty array`);let o=a.map((e,n)=>{if(!Array.isArray(e)||e.length===0)throw new _(`${t}: "rows[${n}]" must be a non-empty array`);if(e.length!==i.length)throw new _(`${t}: "rows[${n}]" has ${e.length} cells but there are ${i.length} columns`);return e.map((e,r)=>{if(typeof e!=`string`||e.trim()===``)throw new _(`${t}: "rows[${n}][${r}]" must be a non-empty string`);return e})}),s=i.map(e=>`        <th scope="col" class="tt-comparison__th">${v(e)}</th>`).join(`
`),c=o.map(e=>{let[t,...n]=e,r=`        <th scope="row" class="tt-comparison__rowhead">${v(t??``)}</th>`,i=n.map(e=>`        <td class="tt-comparison__td">${v(e)}</td>`).join(`
`);return`      <tr class="tt-comparison__row">\n${r}${i?`
`+i:``}\n      </tr>`}).join(`
`);return`
<section class="tt-widget tt-comparison" data-ripple="true" data-spotlight="true" data-magnetic="true" aria-label="${v(r)}">
  <h3 class="tt-widget__heading tt-comparison__heading">${v(r)}</h3>
  <div class="tt-comparison__scroll">
    <table class="tt-comparison__table">
      <caption class="tt-comparison__caption">${v(r)}</caption>
      <thead>
      <tr>
${s}
      </tr>
      </thead>
      <tbody>
${c}
      </tbody>
    </table>
  </div>
</section>`.trim()}function A(e){let t=`steps`,n=T(e,t),r=b(n,`title`,t),i=w(n,`steps`,t).map((e,n)=>{let r=b(e,`title`,`${t}.steps[${n}]`),i=b(e,`body`,`${t}.steps[${n}]`);return`    <li class="tt-steps__item">
      <span class="tt-steps__marker" aria-hidden="true"></span>
      <div class="tt-steps__content">
        <p class="tt-steps__title">${v(r)}</p>
        <p class="tt-steps__body">${v(i)}</p>
      </div>
    </li>`}).join(`
`);return`
<section class="tt-widget tt-steps" data-ripple="true" data-spotlight="true" data-magnetic="true" aria-label="${v(r)}">
  <h3 class="tt-widget__heading tt-steps__heading">${v(r)}</h3>
  <ol class="tt-steps__list">
${i}
  </ol>
</section>`.trim()}function j(e){let t=`platform-tabs`,n=T(e,t),r=b(n,`title`,t),i=w(n,`tabs`,t),a=2166136261,o=r+i.map((e,t)=>String(e.os??t)).join(`|`);for(let e=0;e<o.length;e+=1)a=Math.imul(a^o.charCodeAt(e),16777619);let s=(a>>>0).toString(36),c=i.map((e,n)=>{let r=b(e,`os`,`${t}.tabs[${n}]`);return`      <label class="tt-platform-tabs__tab" data-ripple="true" data-spotlight="true" data-magnetic="true"><input type="radio" name="tt-platform-tabs-${s}" value="${n}"${n===0?` checked`:``}> ${v(r)}</label>`}).join(`
`),l=i.map((e,n)=>{let r=b(e,`os`,`${t}.tabs[${n}]`),i=b(e,`code`,`${t}.tabs[${n}]`),a=x(e,`note`),o=x(e,`lang`),s=a?`        <p class="tt-platform-tabs__note">${v(a)}</p>\n`:``;return`      <div class="tt-platform-tabs__panel">
        <h4 class="tt-platform-tabs__panel-os">${v(r)}</h4>
${s}        <pre class="tt-platform-tabs__code"${o?` data-lang="${v(o)}"`:``}><code>${v(i)}</code></pre>
      </div>`}).join(`
`);return`
<section class="tt-widget tt-platform-tabs" data-ripple="true" data-spotlight="true" data-magnetic="true" aria-label="${v(r)}">
  <h3 class="tt-widget__heading tt-platform-tabs__heading">${v(r)}</h3>
  <div class="tt-platform-tabs__inner">
    <div class="tt-platform-tabs__list" role="group" aria-label="Choose your platform">
${c}
    </div>
    <div class="tt-platform-tabs__panels">
${l}
    </div>
  </div>
</section>`.trim()}function M(e){let t=T(e,`faq`),n=b(t,`title`,`faq`),r=w(t,`items`,`faq`).map((e,t)=>{let r=b(e,`q`,`faq.items[${t}]`),i=b(e,`a`,`faq.items[${t}]`);return`    <details class="tt-faq__item" name="${v(n)}">
      <summary class="tt-faq__question" data-ripple="true" data-spotlight="true" data-magnetic="true">${v(r)}</summary>
      <div class="tt-faq__answer">${v(i)}</div>
    </details>`}).join(`
`);return`
<section class="tt-widget tt-faq" data-ripple="true" data-spotlight="true" data-magnetic="true" aria-label="${v(n)}">
  <h3 class="tt-widget__heading tt-faq__heading">${v(n)}</h3>
  <div class="tt-faq__list">
${r}
  </div>
</section>`.trim()}function N(e){let t=`timeline`,n=T(e,t),r=b(n,`title`,t),i=w(n,`events`,t).map((e,n)=>{let r=b(e,`label`,`${t}.events[${n}]`),i=b(e,`body`,`${t}.events[${n}]`);return`    <li class="tt-timeline__event">
      <span class="tt-timeline__dot" aria-hidden="true"></span>
      <div class="tt-timeline__content">
        <p class="tt-timeline__label">${v(r)}</p>
        <p class="tt-timeline__body">${v(i)}</p>
      </div>
    </li>`}).join(`
`);return`
<section class="tt-widget tt-timeline" data-ripple="true" data-spotlight="true" data-magnetic="true" aria-label="${v(r)}">
  <h3 class="tt-widget__heading tt-timeline__heading">${v(r)}</h3>
  <ol class="tt-timeline__list">
${i}
  </ol>
</section>`.trim()}function P(e){let t=`stat-cards`,n=T(e,t),r=b(n,`title`,t),i=w(n,`cards`,t).map((e,n)=>{let r=b(e,`value`,`${t}.cards[${n}]`),i=b(e,`label`,`${t}.cards[${n}]`),a=x(e,`source`),o=a?`\n      <p class="tt-stat-cards__source">${v(a)}</p>`:``;return`    <li class="tt-stat-cards__card" data-ripple="true" data-spotlight="true" data-magnetic="true">
      <p class="tt-stat-cards__value">${v(r)}</p>
      <p class="tt-stat-cards__label">${v(i)}</p>${o}
    </li>`}).join(`
`);return`
<section class="tt-widget tt-stat-cards" data-ripple="true" data-spotlight="true" data-magnetic="true" aria-label="${v(r)}">
  <h3 class="tt-widget__heading tt-stat-cards__heading">${v(r)}</h3>
  <ul class="tt-stat-cards__grid">
${i}
  </ul>
</section>`.trim()}function ne(e){let t=`pros-cons`,n=T(e,t),r=b(n,`title`,t),i=C(n,`pros`,t),a=C(n,`cons`,t),o=i.map(e=>`      <li class="tt-pros-cons__item">${v(e)}</li>`).join(`
`),s=a.map(e=>`      <li class="tt-pros-cons__item">${v(e)}</li>`).join(`
`);return`
<section class="tt-widget tt-pros-cons" data-ripple="true" data-spotlight="true" data-magnetic="true" aria-label="${v(r)}">
  <h3 class="tt-widget__heading tt-pros-cons__heading">${v(r)}</h3>
  <div class="tt-pros-cons__columns">
    <div class="tt-pros-cons__col tt-pros-cons__col--pros">
      <p class="tt-pros-cons__colhead">Pros</p>
      <ul class="tt-pros-cons__list">
${o}
      </ul>
    </div>
    <div class="tt-pros-cons__col tt-pros-cons__col--cons">
      <p class="tt-pros-cons__colhead">Cons</p>
      <ul class="tt-pros-cons__list">
${s}
      </ul>
    </div>
  </div>
</section>`.trim()}function re(e){let t=`glossary`,n=T(e,t),r=b(n,`title`,t),i=w(n,`terms`,t).map((e,n)=>{let r=b(e,`term`,`${t}.terms[${n}]`),i=b(e,`def`,`${t}.terms[${n}]`);return`    <div class="tt-glossary__entry">
      <dt class="tt-glossary__term">${v(r)}</dt>
      <dd class="tt-glossary__def">${v(i)}</dd>
    </div>`}).join(`
`);return`
<section class="tt-widget tt-glossary" data-ripple="true" data-spotlight="true" data-magnetic="true" aria-label="${v(r)}">
  <h3 class="tt-widget__heading tt-glossary__heading">${v(r)}</h3>
  <dl class="tt-glossary__list">
${i}
  </dl>
</section>`.trim()}function ie(e){let t=`pullquote`,n=T(e,t),r=b(n,`quote`,t),i=n.attribution,a=typeof i==`string`&&i.trim()!==``?i:void 0,o=a?`\n  <figcaption class="tt-pullquote__attr">— ${v(a)}</figcaption>`:``;return`
<figure class="tt-widget tt-pullquote" data-ripple="true" data-spotlight="true" data-magnetic="true">
  <blockquote class="tt-pullquote__quote">${v(r)}</blockquote>${o}
</figure>`.trim()}function ae(e){let t=`spec-table`,n=T(e,t),r=b(n,`title`,t),i=w(n,`specs`,t).map((e,n)=>{let r=b(e,`label`,`${t}.specs[${n}]`),i=b(e,`value`,`${t}.specs[${n}]`);return`    <div class="tt-spec-table__row">
      <dt class="tt-spec-table__label">${v(r)}</dt>
      <dd class="tt-spec-table__value">${v(i)}</dd>
    </div>`}).join(`
`);return`
<section class="tt-widget tt-spec-table" data-ripple="true" data-spotlight="true" data-magnetic="true" aria-label="${v(r)}">
  <h3 class="tt-widget__heading tt-spec-table__heading">${v(r)}</h3>
  <dl class="tt-spec-table__list">
${i}
  </dl>
</section>`.trim()}function oe(e){let t=`scorecard`,n=T(e,t),r=b(n,`title`,t),i=w(n,`criteria`,t).map((e,n)=>{let r=b(e,`label`,`${t}.criteria[${n}]`),i=S(e,`score`,`${t}.criteria[${n}]`),a=ee(e,`max`)??10;if(a<=0)throw new _(`${t}.criteria[${n}]: "max" must be greater than 0`);let o=x(e,`note`),s=Math.max(0,Math.min(100,i/a*100)),c=Number(s.toFixed(4)).toString(),l=Number(i.toFixed(2)).toString(),u=Number(a.toFixed(2)).toString(),d=v(`${r}: ${l} out of ${u}`),f=o?`\n      <p class="tt-scorecard__note">${v(o)}</p>`:``;return`    <li class="tt-scorecard__row">
      <div class="tt-scorecard__head">
        <span class="tt-scorecard__label">${v(r)}</span>
        <span class="tt-scorecard__value"><span class="tt-scorecard__score">${v(l)}</span><span class="tt-scorecard__max">/${v(u)}</span></span>
      </div>
      <div class="tt-scorecard__track" role="img" aria-label="${d}">
        <span class="tt-scorecard__fill" style="--tt-score:${c}"></span>
      </div>${f}
    </li>`}).join(`
`);return`
<section class="tt-widget tt-scorecard" data-ripple="true" data-spotlight="true" data-magnetic="true" aria-label="${v(r)}">
  <h3 class="tt-widget__heading tt-scorecard__heading">${v(r)}</h3>
  <ul class="tt-scorecard__list">
${i}
  </ul>
</section>`.trim()}function se(e){let t=`accordion`,n=T(e,t),r=b(n,`title`,t),i=w(n,`items`,t).map((e,n)=>{let r=b(e,`summary`,`${t}.items[${n}]`),i=b(e,`body`,`${t}.items[${n}]`);return`    <details class="tt-accordion__item">
      <summary class="tt-accordion__summary" data-ripple="true" data-spotlight="true" data-magnetic="true">${v(r)}</summary>
      <div class="tt-accordion__body">${v(i)}</div>
    </details>`}).join(`
`);return`
<section class="tt-widget tt-accordion" data-ripple="true" data-spotlight="true" data-magnetic="true" aria-label="${v(r)}">
  <h3 class="tt-widget__heading tt-accordion__heading">${v(r)}</h3>
  <div class="tt-accordion__list">
${i}
  </div>
</section>`.trim()}var ce={callout:te,takeaways:O,comparison:k,steps:A,faq:M,timeline:N,"stat-cards":P,"pros-cons":ne,glossary:re,pullquote:ie,"platform-tabs":j,"spec-table":ae,scorecard:oe,accordion:se};function le(e,t){if(!h(e))throw new _(`Unknown widget type "${e}". Expected one of: ${m.join(`, `)}`);return ce[e](t)}var ue=`.tt-widget {
  --tt-bg: #0b0c1e;
  --tt-bg-raised: #11132a;
  --tt-border: #26294a;
  --tt-fg: #e7e9f3;
  --tt-fg-muted: #a6abc9;
  --tt-accent: #00e5ff;
  --tt-accent-2: #2aa7c7;
  --tt-info: #00e5ff;
  --tt-warning: #f5a623;
  --tt-success: #3ddc84;
  --tt-tip: #50aae3;
  --tt-pros: #3ddc84;
  --tt-cons: #ff6b6b;
  --tt-radius: 14px;
  --tt-gap: 0.75rem;
  --tt-motion: 180ms cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  box-sizing: border-box;
  margin: 1.9rem 0;
  padding: 1.4rem 1.55rem;
  background:
    radial-gradient(135% 125% at 0% 0%, rgba(0, 229, 255, 0.06), transparent 52%),
    radial-gradient(125% 125% at 100% 0%, rgba(80, 170, 227, 0.06), transparent 55%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.032), rgba(255, 255, 255, 0) 42%),
    var(--tt-bg);
  border: 1px solid var(--tt-border);
  border-radius: var(--tt-radius);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 22px 48px -30px rgba(0, 0, 0, 0.9);
  color: var(--tt-fg);
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  font-size: 0.9375rem;
  line-height: 1.65;
}
/* A lit top edge — the cinematic hairline that reads premium across every widget. */
.tt-widget::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0, 229, 255, 0.55) 26%, rgba(80, 170, 227, 0.4) 74%, transparent);
  border-top-left-radius: var(--tt-radius);
  border-top-right-radius: var(--tt-radius);
}
.tt-widget *,
.tt-widget *::before,
.tt-widget *::after { box-sizing: border-box; }
.tt-widget :where(a) {
  color: var(--tt-accent);
  text-decoration: underline;
  text-underline-offset: 2px;
}
.tt-widget :where(a):hover { color: #7df4ff; }
.tt-widget :where(a):focus-visible,
.tt-widget :where(summary):focus-visible,
.tt-widget :where(details):focus-visible {
  outline: 2px solid var(--tt-accent);
  outline-offset: 2px;
  border-radius: 4px;
}
.tt-widget__heading {
  margin: 0 0 1.5rem 0;
  font-size: 1.35rem;
  font-weight: 800;
  line-height: 1.22;
  color: #ffffff;
  letter-spacing: -0.02em;
}

/* Callout ---------------------------------------------------------------- */
.tt-callout {
  display: flex;
  gap: 0.875rem;
  align-items: flex-start;
  border-left-width: 4px;
}
.tt-callout--info { border-left-color: var(--tt-info); }
.tt-callout--warning { border-left-color: var(--tt-warning); }
.tt-callout--success { border-left-color: var(--tt-success); }
.tt-callout--tip { border-left-color: var(--tt-tip); }
.tt-callout__badge {
  flex: 0 0 auto;
  margin-top: 0.1rem;
  padding: 0.15rem 0.55rem;
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  border-radius: 999px;
  color: #060610;
}
.tt-callout--info .tt-callout__badge { background: var(--tt-info); }
.tt-callout--warning .tt-callout__badge { background: var(--tt-warning); }
.tt-callout--success .tt-callout__badge { background: var(--tt-success); }
.tt-callout--tip .tt-callout__badge { background: var(--tt-tip); color: #041016; }
.tt-callout__content { min-width: 0; }
.tt-callout__title { margin: 0 0 0.25rem 0; font-weight: 700; color: #ffffff; }
.tt-callout__body { margin: 0; color: var(--tt-fg); }

/* Takeaways -------------------------------------------------------------- */
.tt-takeaways__list { margin: 0; padding: 0; list-style: none; display: grid; gap: 0.7rem; }
.tt-takeaways__item {
  position: relative;
  padding-left: 1.7rem;
  color: var(--tt-fg);
}
/* A glowing cyan diamond — the lit bullet. */
.tt-takeaways__item::before {
  content: "";
  position: absolute;
  left: 0.1rem;
  top: 0.5em;
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 2px;
  background: linear-gradient(135deg, var(--tt-accent), var(--tt-accent-2));
  box-shadow: 0 0 10px rgba(0, 229, 255, 0.55);
  transform: rotate(45deg);
}

/* Comparison ------------------------------------------------------------- */
.tt-comparison__scroll { overflow-x: auto; -webkit-overflow-scrolling: touch; }
.tt-comparison__table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
  min-width: 28rem;
}
.tt-comparison__caption { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
.tt-comparison__th,
.tt-comparison__rowhead,
.tt-comparison__td {
  padding: 0.6rem 0.8rem;
  text-align: left;
  border-bottom: 1px solid var(--tt-border);
  vertical-align: top;
}
.tt-comparison__th {
  font-weight: 700;
  color: var(--tt-accent);
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.04em;
  background: linear-gradient(180deg, rgba(0, 229, 255, 0.14), rgba(0, 229, 255, 0.04));
  position: sticky;
  top: 0;
}
.tt-comparison__rowhead { font-weight: 600; color: var(--tt-text, var(--tt-fg)); background: var(--tt-bg-raised); }
.tt-comparison__td { color: var(--tt-fg); }
.tt-comparison__row { transition: background var(--tt-motion); }
.tt-comparison__row:hover .tt-comparison__td,
.tt-comparison__row:hover .tt-comparison__rowhead { background: rgba(0, 229, 255, 0.04); }
/* Draw the eye to the winning (last) column. */
.tt-comparison__td:last-child { background: rgba(0, 229, 255, 0.05); color: #ffffff; }
.tt-comparison__row:hover .tt-comparison__td:last-child { background: rgba(0, 229, 255, 0.09); }
.tt-comparison__row:last-child .tt-comparison__th,
.tt-comparison__row:last-child .tt-comparison__td { border-bottom: 0; }

/* Steps ------------------------------------------------------------------ */
.tt-steps__list { margin: 0; padding: 0; list-style: none; counter-reset: tt-step; display: grid; gap: 1rem; }
.tt-steps__item {
  position: relative;
  display: flex;
  gap: 0.875rem;
  counter-increment: tt-step;
}
/* A gradient flow-line linking each numbered marker to the next. */
.tt-steps__item:not(:last-child)::before {
  content: "";
  position: absolute;
  left: 1rem;
  top: 2.15rem;
  bottom: -1.15rem;
  width: 2px;
  transform: translateX(-50%);
  background: linear-gradient(180deg, var(--tt-accent), var(--tt-accent-2));
  opacity: 0.32;
}
.tt-steps__marker {
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--tt-accent), var(--tt-accent-2));
  color: #060610;
  font-weight: 800;
  font-size: 0.9rem;
  box-shadow: 0 0 16px rgba(0, 229, 255, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.4);
}
.tt-steps__marker::before { content: counter(tt-step); }
.tt-steps__content { min-width: 0; padding-top: 0.2rem; }
.tt-steps__title { margin: 0 0 0.2rem 0; font-weight: 700; color: #ffffff; }
.tt-steps__body { margin: 0; color: var(--tt-fg-muted); }

/* FAQ -------------------------------------------------------------------- */
.tt-faq__list { display: grid; gap: 0.6rem; }
.tt-faq__item {
  border: 1px solid var(--tt-border);
  border-radius: 8px;
  background: var(--tt-bg-raised);
  overflow: hidden;
}
.tt-faq__question {
  cursor: pointer;
  padding: 0.75rem 0.9rem;
  font-weight: 600;
  color: #ffffff;
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
}
.tt-faq__question::-webkit-details-marker { display: none; }
.tt-faq__question::after {
  content: "+";
  flex: 0 0 auto;
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 1;
  color: var(--tt-accent);
  transition: transform var(--tt-motion);
}
.tt-faq__item[open] .tt-faq__question::after { content: "\\2212"; }
.tt-faq__answer { padding: 0 0.9rem 0.85rem 0.9rem; color: var(--tt-fg-muted); }

/* Timeline --------------------------------------------------------------- */
.tt-timeline__list { margin: 0; padding: 0 0 0 0.25rem; list-style: none; }
.tt-timeline__event {
  position: relative;
  display: flex;
  gap: 0.875rem;
  padding: 0 0 1.1rem 0.75rem;
  border-left: 2px solid var(--tt-border);
}
.tt-timeline__event:last-child { border-left-color: transparent; padding-bottom: 0; }
.tt-timeline__dot {
  position: absolute;
  left: -0.47rem;
  top: 0.2rem;
  width: 0.82rem;
  height: 0.82rem;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--tt-accent), var(--tt-accent-2));
  box-shadow: 0 0 0 3px var(--tt-bg), 0 0 12px rgba(0, 229, 255, 0.65);
}
.tt-timeline__content { min-width: 0; }
.tt-timeline__label {
  display: inline-block;
  margin: 0 0 0.25rem 0;
  font-family: ui-monospace, "JetBrains Mono", monospace;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--tt-accent);
}
.tt-timeline__body { margin: 0; color: var(--tt-fg); }

/* Stat cards ------------------------------------------------------------- */
.tt-stat-cards__grid {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
  gap: var(--tt-gap);
}
.tt-stat-cards__card {
  padding: 1.25rem 1rem;
  border: 1px solid var(--tt-border);
  border-radius: 12px;
  background: linear-gradient(180deg, rgba(0, 229, 255, 0.06), rgba(80, 170, 227, 0.05)), var(--tt-bg-raised);
  text-align: center;
  transition: transform var(--tt-motion), border-color var(--tt-motion), box-shadow var(--tt-motion);
}
.tt-stat-cards__card:hover {
  transform: translateY(-3px);
  border-color: rgba(0, 229, 255, 0.4);
  box-shadow: 0 18px 42px -22px rgba(0, 229, 255, 0.4);
}
.tt-stat-cards__value {
  margin: 0 0 0.3rem 0;
  font-size: 1.85rem;
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #8ff2ff, var(--tt-accent) 45%, var(--tt-accent-2));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  filter: drop-shadow(0 0 16px rgba(0, 229, 255, 0.3));
}
.tt-stat-cards__label { margin: 0; font-size: 0.8125rem; color: var(--tt-fg); }
.tt-stat-cards__source {
  display: inline-block;
  margin: 0.6rem 0 0 0;
  padding: 0.16rem 0.6rem;
  font-family: ui-monospace, "JetBrains Mono", monospace;
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--tt-accent);
  background: rgba(0, 229, 255, 0.09);
  border: 1px solid var(--tt-border);
  border-radius: 999px;
}

/* Pros / Cons ------------------------------------------------------------ */
.tt-pros-cons { padding: 1.6rem 1.75rem; }
.tt-pros-cons__columns { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 0.2rem; }
.tt-pros-cons__col {
  padding: 1.2rem 1.35rem;
  border: 1px solid var(--tt-border);
  border-radius: 10px;
  background: var(--tt-bg-raised);
}
.tt-pros-cons__col--pros { border-top: 3px solid var(--tt-pros); background: linear-gradient(180deg, rgba(61, 220, 132, 0.06), transparent 42%), var(--tt-bg-raised); }
.tt-pros-cons__col--cons { border-top: 3px solid var(--tt-cons); background: linear-gradient(180deg, rgba(255, 107, 107, 0.06), transparent 42%), var(--tt-bg-raised); }
.tt-pros-cons__colhead {
  margin: 0 0 0.8rem 0;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.tt-pros-cons__col--pros .tt-pros-cons__colhead { color: var(--tt-pros); }
.tt-pros-cons__col--cons .tt-pros-cons__colhead { color: var(--tt-cons); }
.tt-pros-cons__list { margin: 0; padding: 0; list-style: none; display: grid; gap: 0.65rem; }
.tt-pros-cons__item { position: relative; padding-left: 1.55rem; color: var(--tt-fg); line-height: 1.55; }
.tt-pros-cons__col--pros .tt-pros-cons__item::before { content: "\\2713"; color: var(--tt-pros); }
.tt-pros-cons__col--cons .tt-pros-cons__item::before { content: "\\2717"; color: var(--tt-cons); }
.tt-pros-cons__item::before { position: absolute; left: 0; top: 0; font-weight: 700; }

/* Glossary --------------------------------------------------------------- */
.tt-glossary__list { margin: 0; display: grid; gap: 0.75rem; }
.tt-glossary__entry {
  padding: 0.8rem 1rem;
  border-left: 3px solid var(--tt-accent-2);
  background: linear-gradient(90deg, rgba(0, 229, 255, 0.07), transparent 32%), var(--tt-bg-raised);
  border-radius: 0 8px 8px 0;
  transition: border-left-color var(--tt-motion), transform var(--tt-motion);
}
.tt-glossary__entry:hover { border-left-color: var(--tt-accent); transform: translateX(2px); }
.tt-glossary__term { margin: 0 0 0.2rem 0; font-weight: 700; color: #ffffff; }
.tt-glossary__def { margin: 0; color: var(--tt-fg-muted); }

/* Spec table ------------------------------------------------------------- */
.tt-spec-table__list { margin: 0; display: grid; gap: 0; border: 1px solid var(--tt-border); border-radius: 10px; overflow: hidden; }
.tt-spec-table__row {
  display: grid;
  grid-template-columns: minmax(8rem, 34%) 1fr;
  gap: 0.75rem;
  padding: 0.7rem 1rem;
  background: var(--tt-bg-raised);
  transition: background var(--tt-motion);
}
.tt-spec-table__row:not(:last-child) { border-bottom: 1px solid var(--tt-border); }
.tt-spec-table__row:hover { background: rgba(0, 229, 255, 0.05); }
.tt-spec-table__label {
  margin: 0;
  font-family: ui-monospace, "JetBrains Mono", monospace;
  font-size: 0.74rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.055em;
  color: var(--tt-accent);
  align-self: center;
}
.tt-spec-table__value { margin: 0; color: #ffffff; font-weight: 600; align-self: center; min-width: 0; overflow-wrap: break-word; }

/* Scorecard -------------------------------------------------------------- */
.tt-scorecard__list { margin: 0; padding: 0; list-style: none; display: grid; gap: 1rem; }
.tt-scorecard__row { display: grid; gap: 0.5rem; }
.tt-scorecard__head { display: flex; justify-content: space-between; align-items: baseline; gap: 0.75rem; }
.tt-scorecard__label { font-weight: 600; color: #ffffff; min-width: 0; }
.tt-scorecard__value { flex: 0 0 auto; font-family: ui-monospace, "JetBrains Mono", monospace; font-size: 0.85rem; white-space: nowrap; }
.tt-scorecard__score { font-weight: 800; color: var(--tt-accent); }
.tt-scorecard__max { color: var(--tt-fg-muted); }
.tt-scorecard__track {
  position: relative;
  height: 0.6rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid var(--tt-border);
  overflow: hidden;
}
.tt-scorecard__fill {
  display: block;
  height: 100%;
  width: calc(var(--tt-score, 0) * 1%);
  border-radius: inherit;
  background: linear-gradient(90deg, var(--tt-accent-2), var(--tt-accent) 65%, #8ff2ff);
  box-shadow: 0 0 12px rgba(0, 229, 255, 0.45);
  transition: width var(--tt-motion);
}
.tt-scorecard__note { margin: 0; font-size: 0.82rem; color: var(--tt-fg-muted); line-height: 1.5; }

/* Accordion -------------------------------------------------------------- */
.tt-accordion__list { display: grid; gap: 0.6rem; }
.tt-accordion__item {
  border: 1px solid var(--tt-border);
  border-radius: 8px;
  background: var(--tt-bg-raised);
  overflow: hidden;
  transition: border-color var(--tt-motion);
}
.tt-accordion__item[open] { border-color: rgba(0, 229, 255, 0.4); }
.tt-accordion__summary {
  cursor: pointer;
  padding: 0.75rem 0.9rem;
  font-weight: 600;
  color: #ffffff;
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  position: relative;
  overflow: hidden;
}
.tt-accordion__summary::-webkit-details-marker { display: none; }
.tt-accordion__summary::after {
  content: "";
  flex: 0 0 auto;
  width: 0.62rem;
  height: 0.62rem;
  border-right: 2px solid var(--tt-accent);
  border-bottom: 2px solid var(--tt-accent);
  transform: rotate(45deg);
  transition: transform var(--tt-motion);
}
.tt-accordion__item[open] .tt-accordion__summary::after { transform: rotate(-135deg); }
.tt-accordion__body { padding: 0 0.9rem 0.85rem 0.9rem; color: var(--tt-fg-muted); }

/* Responsive ------------------------------------------------------------- */
/* Pull quote ------------------------------------------------------------- */
.tt-pullquote {
  position: relative;
  border: 0;
  border-left: 3px solid var(--tt-accent);
  background: linear-gradient(100deg, rgba(0, 229, 255, 0.07), rgba(0, 229, 255, 0) 60%);
  padding: 1.4rem 1.6rem 1.4rem 2.4rem;
  margin: 2rem 0;
}
.tt-pullquote::before {
  content: "\\201C";
  position: absolute;
  left: 0.5rem;
  top: 0.1rem;
  font-size: 3.2rem;
  line-height: 1;
  color: var(--tt-accent);
  opacity: 0.45;
  font-family: Georgia, "Times New Roman", serif;
}
.tt-pullquote__quote {
  margin: 0;
  font-size: clamp(1.25rem, 2.6vw, 1.7rem);
  line-height: 1.38;
  font-weight: 600;
  letter-spacing: -0.015em;
  color: #ffffff;
  text-wrap: balance;
}
.tt-pullquote__attr {
  margin: 0.85rem 0 0;
  font-family: ui-monospace, "JetBrains Mono", monospace;
  font-size: 0.8rem;
  color: var(--tt-accent);
  letter-spacing: 0.02em;
}

@media (max-width: 36rem) {
  .tt-pros-cons__columns { grid-template-columns: 1fr; }
  .tt-widget { padding: 1rem 1.1rem; }
  .tt-pullquote { padding: 1.1rem 1.2rem 1.1rem 2rem; }
  /* Spec sheet stacks label-over-value on narrow screens. */
  .tt-spec-table__row { grid-template-columns: 1fr; gap: 0.2rem; }
  .tt-spec-table__label { align-self: start; }
}

/* Platform/version tabs (CSS-only; keyboard + no-JS) --------------------- */
.tt-platform-tabs__list { display: flex; flex-wrap: wrap; gap: 6px; border-bottom: 1px solid var(--tt-border); margin: 0.4rem 0 1rem; }
.tt-platform-tabs__tab { position: relative; overflow: hidden; display: inline-flex; align-items: center; font-family: var(--tt-mono, monospace); font-size: 0.82rem;
  padding: 8px 15px; cursor: pointer; color: var(--tt-fg-muted); border-bottom: 2px solid transparent;
  border-radius: 8px 8px 0 0; transition: color var(--tt-motion), border-color var(--tt-motion), background var(--tt-motion), transform var(--tt-motion); }
.tt-platform-tabs__tab::after,
.tt-faq__summary::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(circle at var(--tt-ripple-x, 50%) var(--tt-ripple-y, 50%), rgba(0, 229, 255, 0.24) 0%, transparent 65%);
  transform: scale(0);
  opacity: 0;
  transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1), opacity 320ms ease-out;
}
.tt-platform-tabs__tab:active::after,
.tt-faq__summary:active::after {
  transform: scale(2.4);
  opacity: 1;
  transition: 0s;
}
.tt-platform-tabs__tab input { position: absolute; width: 1px; height: 1px; opacity: 0; margin: 0; pointer-events: none; }
.tt-platform-tabs__tab:hover { color: var(--tt-fg); }
.tt-platform-tabs__tab:has(input:checked) { color: var(--tt-accent); border-bottom-color: var(--tt-accent); background: rgba(0, 229, 255, 0.06); }
.tt-platform-tabs__tab:has(input:focus-visible) { outline: 2px solid var(--tt-accent); outline-offset: 2px; }
.tt-platform-tabs__panel { display: none; }
.tt-platform-tabs__inner:has(.tt-platform-tabs__tab:nth-of-type(1) input:checked) .tt-platform-tabs__panel:nth-of-type(1),
.tt-platform-tabs__inner:has(.tt-platform-tabs__tab:nth-of-type(2) input:checked) .tt-platform-tabs__panel:nth-of-type(2),
.tt-platform-tabs__inner:has(.tt-platform-tabs__tab:nth-of-type(3) input:checked) .tt-platform-tabs__panel:nth-of-type(3),
.tt-platform-tabs__inner:has(.tt-platform-tabs__tab:nth-of-type(4) input:checked) .tt-platform-tabs__panel:nth-of-type(4) { display: block; }
.tt-platform-tabs__panel-os { display: none; }
.tt-platform-tabs__note { margin: 0 0 0.6rem; color: var(--tt-fg-muted); font-size: 0.9rem; line-height: 1.5; }
.tt-platform-tabs__code { margin: 0; background: #0a1017; border: 1px solid var(--tt-border); border-radius: 10px;
  padding: 15px 16px; overflow: auto; font-family: var(--tt-mono, monospace); font-size: 0.85rem; color: #cfe8f2; position: relative; }
.tt-platform-tabs__code[data-lang]::before { content: attr(data-lang); position: absolute; top: 6px; right: 12px; font-size: 10px;
  letter-spacing: 0.1em; text-transform: uppercase; color: var(--tt-accent); opacity: 0.6; pointer-events: none; }
.tt-platform-tabs__code code { font-family: inherit; white-space: pre; background: none; padding: 0; }
/* Graceful fallback where :has() is unsupported — show every panel, labelled by OS (nothing hidden). */
@supports not (selector(:has(*))) {
  .tt-platform-tabs__list { display: none; }
  .tt-platform-tabs__panel { display: block; margin-bottom: 1.2rem; }
  .tt-platform-tabs__panel-os { display: block; font-family: var(--tt-mono, monospace); font-size: 0.85rem; color: var(--tt-accent); margin: 0 0 0.45rem; }
}
/* Light reading mode — pin AA-contrast tab and surface colours (the widget accent token stays bright cyan, which
   fails on white; the deep teal + dark grey below pass against the light widget surface). */
:root[data-theme="light"] .tt-widget {
  --tt-bg: #f6f8fa;
  --tt-bg-raised: #ffffff;
  --tt-border: #d0d7de;
  --tt-fg: #17242e;
  --tt-fg-muted: #44566a;
  --tt-accent: #0a6f8a;
  --tt-accent-2: #005cc5;
  box-shadow: 0 1px 0 0 rgba(255, 255, 255, 0.8) inset, 0 14px 36px -22px rgba(15, 23, 42, 0.14);
}
:root[data-theme="light"] .tt-widget__heading,
:root[data-theme="light"] .tt-glossary__term,
:root[data-theme="light"] .tt-spec-table__value,
:root[data-theme="light"] .tt-scorecard__label,
:root[data-theme="light"] .tt-pullquote__quote { color: #0f172a; }
:root[data-theme="light"] .tt-spec-table__label { color: #0a6f8a; }
:root[data-theme="light"] .tt-scorecard__score { color: #0a6f8a; }
:root[data-theme="light"] .tt-scorecard__track { background: rgba(15, 23, 42, 0.08); }
:root[data-theme="light"] .tt-platform-tabs__tab { color: #44566a; }
:root[data-theme="light"] .tt-platform-tabs__tab:hover { color: #17242e; }
:root[data-theme="light"] .tt-platform-tabs__tab:has(input:checked) { color: #0a6f8a; border-bottom-color: #0a6f8a; background: rgba(10, 111, 138, 0.08); }

/* Motion safety ---------------------------------------------------------- */
@media (prefers-reduced-motion: reduce) {
  .tt-widget,
  .tt-widget * { transition: none !important; animation: none !important; }
}`,F=[`featured`,`gallery`,`video-browser`];function de(e){return F.includes(e)}var I=class extends Error{constructor(e){super(e),this.name=`WidgetError`}};function L(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#039;`)}function R(e){return typeof e==`object`&&!!e&&!Array.isArray(e)}function z(e,t,n){let r=e[t];if(typeof r!=`string`||r.trim()===``)throw new I(`${n}: field "${t}" must be a non-empty string`);return r}function B(e,t){let n=e[t];return typeof n==`string`&&n.trim()!==``?n:void 0}function V(e,t,n,r){let i=e[t];if(!Array.isArray(i)||i.length<r)throw new I(`${n}: field "${t}" must be an array of at least ${r}`);return i.map((e,r)=>{if(!R(e))throw new I(`${n}: "${t}[${r}]" must be an object`);return e})}function H(e,t){if(!R(e))throw new I(`${t}: data must be an object`);return e}function fe(e,t,n){let r=z(e,t,n);if(!/^[A-Za-z0-9_-]+$/.test(r))throw new I(`${n}: field "${t}" is not a valid YouTube id`);return r}var U=1200,W=630,G=1200,K=630,pe=480,me=360,q=0;function J(){return q+=1,`${Date.now().toString(36)}-${q.toString(36)}`}function he(e){let t=`featured`,n=H(e,t),r=z(n,`src`,t),i=z(n,`alt`,t),a=B(n,`caption`),o=a?`\n  <figcaption class="tt-featured__caption">${L(a)}</figcaption>`:``;return`
<figure class="tt-widget tt-featured">
  <img class="tt-featured__img" src="${L(r)}" alt="${L(i)}" loading="eager" fetchpriority="high" decoding="async" width="${U}" height="${W}" data-tt-zoom>${o}
</figure>`.trim()}function ge(e){let t=`gallery`,n=H(e,t),r=z(n,`title`,t),i=V(n,`images`,t,2),a=`tt-gal-${J()}`,o=i.length,s=e=>`${a}-${e}`,c=i.map((e,n)=>({src:L(z(e,`src`,`${t}.images[${n}]`)),alt:L(z(e,`alt`,`${t}.images[${n}]`)),caption:B(e,`caption`)})),l=c.map((e,t)=>{let n=s((t-1+o)%o),r=s((t+1)%o),i=t===0?` checked`:``,c=e.caption?`<span class="tt-gallery__slide-text">${L(e.caption)}</span>`:``;return`    <input class="tt-gallery__radio" type="radio" name="${a}" id="${s(t)}"${i}>
    <figure class="tt-gallery__slide">
      <div class="tt-gallery__frame">
        <img class="tt-gallery__slide-img" src="${e.src}" alt="${e.alt}" loading="lazy" decoding="async" width="${G}" height="${K}" data-tt-zoom>
        <label class="tt-gallery__nav tt-gallery__prev" for="${n}"><span aria-hidden="true">&#8249;</span><span class="tt-sr-only">Previous image</span></label>
        <label class="tt-gallery__nav tt-gallery__next" for="${r}"><span aria-hidden="true">&#8250;</span><span class="tt-sr-only">Next image</span></label>
      </div>
      <figcaption class="tt-gallery__slide-cap">
        <span class="tt-gallery__count">${t+1} / ${o}</span>${c}
      </figcaption>
    </figure>`}).join(`
`),u=c.map((e,t)=>`    <label class="tt-gallery__thumb" for="${s(t)}">
      <img class="tt-gallery__thumb-img" src="${e.src}" alt="" loading="lazy" decoding="async">
      <span class="tt-sr-only">Show image ${t+1} of ${o}: ${L(e.alt)}</span>
    </label>`).join(`
`);return`
<section class="tt-widget tt-gallery" aria-label="${L(r)}">
  <h3 class="tt-widget__heading tt-gallery__heading">${L(r)}</h3>
  <div class="tt-gallery__slideshow">
    <div class="tt-gallery__stage">
${l}
    </div>
    <div class="tt-gallery__thumbs">
${u}
    </div>
  </div>
</section>`.trim()}function _e(e){let t=`video-browser`,n=H(e,t),r=z(n,`title`,t),i=V(n,`tabs`,t,1),a=`tt-vb-${J()}`,o=-1,s=0,c=[];for(let e=0;e<i.length&&s<3;e+=1){let n=i[e],r=z(n,`label`,`${t}.tabs[${e}]`),l=V(n,`videos`,`${t}.tabs[${e}]`,1),u=[];for(let n=0;n<l.length&&s<3;n+=1){let r=l[n];o+=1,s+=1;let i=fe(r,`id`,`${t}.tabs[${e}].videos[${n}]`),c=z(r,`title`,`${t}.tabs[${e}].videos[${n}]`),d=z(r,`channel`,`${t}.tabs[${e}].videos[${n}]`),f=`https://i.ytimg.com/vi/${i}/hqdefault.jpg`,p=`https://www.youtube-nocookie.com/embed/${i}?autoplay=1&rel=0`,m=`${a}-${o}`,h=o===0?` checked`:``;u.push(`  <input class="tt-video-browser__radio" type="radio" name="${a}" id="${m}"${h}>
  <label class="tt-video-browser__tab" for="${m}">
    <span class="tt-video-browser__tabtitle">${L(c)}</span>
    <span class="tt-video-browser__tabchannel">${L(d)}</span>
  </label>
  <div class="tt-video-browser__preview">
    <a class="tt-video-browser__facade" href="${L(p)}" data-tt-yt="${i}" data-tt-title="${L(c)}" target="_blank" rel="noopener" aria-label="Play ${L(c)} inline">
      <span class="tt-video-browser__thumb">
        <img class="tt-video-browser__poster" src="${L(f)}" alt="${L(c)}" loading="lazy" decoding="async" width="${pe}" height="${me}">
        <span class="tt-video-browser__play" aria-hidden="true"></span>
      </span>
    </a>
    <div class="tt-video-browser__previewmeta">
      <span class="tt-video-browser__previewtitle">${L(c)}</span>
      <span class="tt-video-browser__previewchannel">${L(d)}</span>
    </div>
  </div>`)}u.length>0&&c.push(`  <p class="tt-video-browser__group">${L(r)}</p>\n${u.join(`
`)}`)}return`
<section class="tt-widget tt-video-browser" aria-label="${L(r)}">
  <h3 class="tt-widget__heading tt-video-browser__heading">${L(r)}</h3>
  <div class="tt-video-browser__split">
${c.join(`
`)}
  </div>
</section>`.trim()}var ve={featured:he,gallery:ge,"video-browser":_e};function ye(e,t){if(!de(e))throw new I(`Unknown media widget type "${e}". Expected one of: ${F.join(`, `)}`);return ve[e](t)}var be=`
.tt-widget.tt-featured,
.tt-widget.tt-gallery,
.tt-widget.tt-video-browser {
  --tt-media-bg: #0b0b1a;
  --tt-media-fg: #e7e9f3;
  --tt-media-fg-muted: #a6abc9;
  --tt-media-accent: #00e5ff;
  --tt-media-accent-2: #50aae3;
  --tt-media-border: rgba(0, 229, 255, 0.16);
  --tt-media-radius: 14px;
  --tt-media-motion: 200ms cubic-bezier(0.16, 1, 0.3, 1);
  background: var(--tt-media-bg);
  border: 1px solid var(--tt-media-border);
  border-radius: var(--tt-media-radius);
}

/* Featured image -------------------------------------------------------- */
.tt-featured {
  margin: 1.9rem 0;
  padding: 0;
  overflow: hidden;
  border-color: rgba(0, 229, 255, 0.22);
  box-shadow: 0 0 0 1px rgba(0, 229, 255, 0.1), 0 30px 72px -38px rgba(0, 229, 255, 0.42),
    0 22px 48px -30px rgba(0, 0, 0, 0.9);
}
.tt-featured__img {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: ${U} / ${W};
  object-fit: cover;
  background: linear-gradient(135deg, rgba(0, 229, 255, 0.1), rgba(80, 170, 227, 0.12));
}
.tt-featured__caption {
  margin: 0;
  padding: 0.75rem 1.125rem;
  font-size: 0.8125rem;
  color: var(--tt-media-fg-muted);
  border-top: 1px solid var(--tt-media-border);
  text-align: center;
}

/* Gallery slideshow — one big image at a time, CSS-only crossfade ----------- */
.tt-gallery { padding: 1.7rem 1.85rem 1.9rem; }
.tt-gallery__heading {
  margin: 0.1rem 0 1.65rem 0;
  font-size: 1.5rem;
  font-weight: 800;
  line-height: 1.2;
  color: #ffffff;
  letter-spacing: -0.02em;
}
/* Radios are visually hidden but keyboard-focusable via their labels. */
.tt-gallery__radio {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}
/* Every slide occupies the SAME grid cell (stacked) so the stage height is stable and the active
   slide crossfades in. The checked radio's adjacent slide becomes visible. */
.tt-gallery__stage { display: grid; }
.tt-gallery__slide {
  grid-area: 1 / 1;
  margin: 0;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 0.45s var(--tt-media-motion), visibility 0.45s;
}
.tt-gallery__radio:checked + .tt-gallery__slide {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  position: relative;
  z-index: 1;
}
.tt-gallery__frame {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--tt-media-border);
  border-radius: 14px;
  background: #0b0b1a;
  box-shadow: 0 0 0 1px rgba(0, 229, 255, 0.08), 0 26px 60px -34px rgba(0, 229, 255, 0.4),
    0 20px 44px -30px rgba(0, 0, 0, 0.9);
}
.tt-gallery__slide-img {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: ${G} / ${K};
  object-fit: contain;
  background: linear-gradient(135deg, rgba(0, 229, 255, 0.06), rgba(0, 229, 255, 0.02));
}
/* Prev / next arrows overlaid on the frame (labels → keyboard-reachable via the radios). */
.tt-gallery__nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: grid;
  place-items: center;
  width: 2.9rem;
  height: 2.9rem;
  font-size: 1.7rem;
  line-height: 1;
  cursor: pointer;
  color: var(--tt-media-fg);
  background: rgba(6, 6, 16, 0.58);
  border: 1px solid var(--tt-media-border);
  border-radius: 50%;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  transition: background var(--tt-media-motion), color var(--tt-media-motion),
    border-color var(--tt-media-motion), transform var(--tt-media-motion);
}
.tt-gallery__prev { left: 0.8rem; }
.tt-gallery__next { right: 0.8rem; }
.tt-gallery__nav:hover {
  background: var(--tt-media-accent);
  color: #060610;
  border-color: transparent;
  transform: translateY(-50%) scale(1.06);
}
.tt-gallery__nav:focus-visible { outline: 2px solid var(--tt-media-accent); outline-offset: 2px; }
.tt-gallery__slide-cap {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0;
  padding: 0.85rem 0.25rem 0.1rem;
  min-height: 2.3rem;
  font-size: 0.9rem;
  color: var(--tt-media-fg-muted);
}
.tt-gallery__count {
  flex: 0 0 auto;
  font-family: ui-monospace, "JetBrains Mono", monospace;
  font-size: 0.72rem;
  font-weight: 700;
  color: #060610;
  background: var(--tt-media-accent);
  border-radius: 999px;
  padding: 0.2rem 0.6rem;
}
.tt-gallery__slide-text { color: var(--tt-media-fg); }
/* Thumbnail filmstrip — each is a label that selects its slide (works across the DOM). */
.tt-gallery__thumbs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 1.2rem;
}
.tt-gallery__thumb {
  flex: 0 0 auto;
  width: 5.2rem;
  cursor: pointer;
  border: 1px solid var(--tt-media-border);
  border-radius: 9px;
  overflow: hidden;
  opacity: 0.62;
  transition: opacity var(--tt-media-motion), border-color var(--tt-media-motion), transform var(--tt-media-motion);
}
.tt-gallery__thumb:hover { opacity: 1; border-color: var(--tt-media-accent); transform: translateY(-2px); }
.tt-gallery__thumb:focus-within { outline: 2px solid var(--tt-media-accent); outline-offset: 2px; opacity: 1; }
.tt-gallery__thumb-img {
  display: block;
  width: 100%;
  aspect-ratio: ${G} / ${K};
  object-fit: cover;
}

/* Video browser — master-detail: a left title list selects a big preview ------- */
.tt-video-browser { padding: 1.7rem 1.85rem 1.95rem; }
.tt-video-browser__heading {
  margin: 0.1rem 0 1.7rem 0;
  font-size: 1.5rem;
  font-weight: 800;
  line-height: 1.2;
  color: #ffffff;
  letter-spacing: -0.02em;
}
.tt-video-browser__split {
  display: grid;
  grid-template-columns: minmax(11rem, 17rem) minmax(0, 1fr);
  column-gap: 1.6rem;
  /* row-gap 0 + per-tab margin keeps the left list compact at the top even when the (spanning)
     preview is taller — so the big video never pushes the title list down. */
  row-gap: 0;
  align-items: start;
  align-content: start;
}
/* Radios are visually hidden but keyboard-focusable via their labels. */
.tt-video-browser__radio {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}
/* The originating tab's name, as a small caption above its group of videos. */
.tt-video-browser__group {
  grid-column: 1;
  margin: 0.9rem 0 0.35rem;
  font-family: ui-monospace, "JetBrains Mono", monospace;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--tt-media-accent);
}
.tt-video-browser__group:first-child { margin-top: 0; }
/* Each left-list row (the video title + channel). */
.tt-video-browser__tab {
  grid-column: 1;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  margin-bottom: 0.5rem;
  padding: 0.6rem 0.75rem;
  cursor: pointer;
  border-radius: 10px;
  border-left: 2px solid transparent;
  transition: background var(--tt-media-motion), border-color var(--tt-media-motion), color var(--tt-media-motion);
}
.tt-video-browser__tab:hover { background: rgba(0, 229, 255, 0.06); }
.tt-video-browser__tabtitle {
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1.3;
  color: var(--tt-media-fg);
}
.tt-video-browser__tabchannel {
  font-size: 0.72rem;
  color: var(--tt-media-fg-muted);
}
.tt-video-browser__radio:focus-visible + .tt-video-browser__tab {
  outline: 2px solid var(--tt-media-accent);
  outline-offset: 2px;
}
.tt-video-browser__radio:checked + .tt-video-browser__tab {
  background: linear-gradient(90deg, rgba(0, 229, 255, 0.15), rgba(0, 229, 255, 0.03));
  border-left-color: var(--tt-media-accent);
}
.tt-video-browser__radio:checked + .tt-video-browser__tab .tt-video-browser__tabtitle { color: #ffffff; }
/* The big preview lives in column 2, spanning the list height; only the checked row's shows. It is
   sticky so the big player stays in view while you scan a long left list (premium master-detail). */
.tt-video-browser__preview {
  grid-column: 2;
  /* span a large fixed count (NOT 1/-1, which resolves to row 1 with no explicit rows and pins the
     preview into row 1, inflating it). With row-gap 0 the extra empty rows cost nothing. */
  grid-row: 1 / span 99;
  align-self: start;
  position: sticky;
  top: 5.5rem;
  display: none;
}
.tt-video-browser__radio:checked + .tt-video-browser__tab + .tt-video-browser__preview { display: block; }
.tt-video-browser__facade {
  display: block;
  text-decoration: none;
  color: inherit;
  border: 1px solid var(--tt-media-border);
  border-radius: 12px;
  overflow: hidden;
  background: #000;
  transition: border-color var(--tt-media-motion), box-shadow var(--tt-media-motion);
}
.tt-video-browser__facade:hover {
  border-color: var(--tt-media-accent);
  box-shadow: 0 0 0 1px rgba(0, 229, 255, 0.18), 0 22px 54px -30px rgba(0, 229, 255, 0.5);
}
.tt-video-browser__facade:focus-visible {
  outline: 2px solid var(--tt-media-accent);
  outline-offset: 2px;
}
.tt-video-browser__thumb {
  position: relative;
  display: block;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}
.tt-video-browser__poster {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
/* Play-button overlay (pure CSS triangle inside a circle). */
.tt-video-browser__play {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 4rem;
  height: 4rem;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: rgba(6, 6, 16, 0.72);
  border: 2px solid var(--tt-media-accent);
  transition: background var(--tt-media-motion), transform var(--tt-media-motion);
}
.tt-video-browser__play::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 54%;
  transform: translate(-50%, -50%);
  border-style: solid;
  border-width: 0.7rem 0 0.7rem 1.15rem;
  border-color: transparent transparent transparent var(--tt-media-accent);
}
.tt-video-browser__facade:hover .tt-video-browser__play {
  background: var(--tt-media-accent);
  transform: translate(-50%, -50%) scale(1.08);
}
.tt-video-browser__facade:hover .tt-video-browser__play::before {
  border-left-color: #060610;
}
.tt-video-browser__previewmeta {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 0.85rem 0.25rem 0.1rem;
}
.tt-video-browser__previewtitle {
  font-size: 1.02rem;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.3;
}
.tt-video-browser__previewchannel {
  font-size: 0.8rem;
  color: var(--tt-media-fg-muted);
}
/* Inline player — created on click by VIDEO_BROWSER_JS; the iframe never ships in server HTML. */
.tt-video-browser__item--playing .tt-video-browser__facade { display: none; }
.tt-video-browser__iframe {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  border: 0;
  border-radius: 12px;
  background: #000;
  box-shadow: 0 0 0 1px rgba(0, 229, 255, 0.25), 0 22px 54px -30px rgba(0, 229, 255, 0.5);
}

/* Responsive ------------------------------------------------------------ */
@media (max-width: 40rem) {
  .tt-gallery,
  .tt-video-browser { padding: 1.15rem 1.15rem 1.3rem; }
  .tt-video-browser__split { grid-template-columns: 1fr; gap: 0.3rem; }
  .tt-video-browser__preview { grid-row: auto; grid-column: 1; position: static; margin: 0.4rem 0 1rem; }
  .tt-gallery__nav { width: 2.4rem; height: 2.4rem; font-size: 1.4rem; }
  .tt-gallery__thumb { width: 4.1rem; }
}

/* Light reading mode ---------------------------------------------------- */
:root[data-theme="light"] .tt-widget.tt-featured,
:root[data-theme="light"] .tt-widget.tt-gallery,
:root[data-theme="light"] .tt-widget.tt-video-browser {
  --tt-media-bg: #f6f8fa;
  --tt-media-bg-raised: #ffffff;
  --tt-media-border: #d0d7de;
  --tt-media-fg: #17242e;
  --tt-media-fg-muted: #44566a;
  --tt-media-accent: #0a6f8a;
  --tt-media-accent-2: #005cc5;
  box-shadow: 0 1px 0 0 rgba(255, 255, 255, 0.8) inset, 0 14px 36px -22px rgba(15, 23, 42, 0.14);
}
:root[data-theme="light"] .tt-gallery__count { color: #ffffff; }
:root[data-theme="light"] .tt-gallery__heading,
:root[data-theme="light"] .tt-video-browser__heading,
:root[data-theme="light"] .tt-video-browser__previewtitle,
:root[data-theme="light"] .tt-video-browser__radio:checked + .tt-video-browser__tab .tt-video-browser__tabtitle {
  color: #0f172a;
}

/* Motion safety --------------------------------------------------------- */
@media (prefers-reduced-motion: reduce) {
  .tt-widget.tt-featured *,
  .tt-widget.tt-gallery *,
  .tt-widget.tt-video-browser * {
    transition: none !important;
    animation: none !important;
  }
  .tt-gallery__slide { transition: none !important; }
  .tt-gallery__nav:hover { transform: translateY(-50%); }
  .tt-video-browser__facade:hover .tt-video-browser__play { transform: translate(-50%, -50%); }
}
`.trim();function xe(e){let t=e.priority?`eager`:`lazy`,n=e.priority?` fetchpriority="high"`:``,r=e.priority?`sync`:`async`,i=e.className?` class="${e.className}"`:``,a=[];e.avifSrc&&a.push(`    <source type="image/avif" srcset="${e.avifSrc}" />`),e.webpSrc&&a.push(`    <source type="image/webp" srcset="${e.webpSrc}" />`);let o=`
<picture${i}>
${a.join(`
`)}
  <img
    src="${e.src}"
    alt="${Y(e.alt)}"
    width="${e.width}"
    height="${e.height}"
    loading="${t}"
    decoding="${r}"${n}
    style="aspect-ratio: ${e.width} / ${e.height}; width: 100%; height: auto; max-width: 100%; border-radius: 8px;"
  />
</picture>`.trim();return e.caption?`
<figure class="tt-media-figure">
  ${o}
  <figcaption class="tt-media-caption">${Y(e.caption)}</figcaption>
</figure>`.trim():o}function Se(e){let t=`https://${e.customerDomain||`iframe.videodelivery.net`}/${e.videoUid}?preload=true&poster=https%3A%2F%2Fvideodelivery.net%2F${e.videoUid}%2Fthumbnails%2Fthumbnail.jpg`,n=`
<div class="tt-video-wrapper" style="aspect-ratio: ${e.aspectRatio||`16 / 9`}; width: 100%; position: relative; border-radius: 8px; overflow: hidden; background: #060610; border: 1px solid oklch(0.3 0.02 240);">
  <iframe
    src="${t}"
    title="${Y(e.title)}"
    style="border: none; position: absolute; top: 0; left: 0; height: 100%; width: 100%;"
    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
    allowfullscreen="true"
    loading="lazy"
  ></iframe>
</div>`.trim();return e.transcriptHtml&&(n+=`
<details class="tt-video-transcript" style="margin-top: 0.75rem; border: 1px solid oklch(0.25 0.02 240); border-radius: 6px; padding: 0.5rem 0.75rem; font-size: 0.875rem;">
  <summary style="cursor: pointer; font-weight: 600; color: oklch(0.7 0.2 200);">Video Transcript & Key Timestamps</summary>
  <div class="tt-transcript-body" style="margin-top: 0.5rem; color: oklch(0.85 0.02 240); line-height: 1.6;">
    ${e.transcriptHtml}
  </div>
</details>`.trim()),n}function Ce(e){return`
<div class="tt-code-container" style="border: 1px solid oklch(0.25 0.02 240); border-radius: 8px; overflow: hidden; margin: 1.5rem 0; background: oklch(0.12 0.02 240);">
  ${e.filename?`<div class="tt-code-header" style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 1rem; background: oklch(0.18 0.02 240); border-bottom: 1px solid oklch(0.25 0.02 240); font-family: ui-monospace, monospace; font-size: 0.8125rem; color: oklch(0.8 0.02 240);">
        <span class="tt-code-filename">${Y(e.filename)}</span>
        <span class="tt-code-lang" style="text-transform: uppercase; font-size: 0.75rem; color: oklch(0.7 0.2 200);">${Y(e.language)}</span>
      </div>`:``}
  <pre style="margin: 0; padding: 1rem; overflow-x: auto; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 0.875rem; line-height: 1.6; color: #FFFFFF;"><code class="language-${Y(e.language)}">${Y(e.code.trim())}</code></pre>
</div>`.trim()}function we(e){let t={info:`oklch(0.7 0.2 200)`,tip:`oklch(0.75 0.2 140)`,warning:`oklch(0.75 0.2 80)`,alert:`oklch(0.65 0.25 30)`,"key-takeaways":`oklch(0.7 0.2 290)`},n={info:`Important Information`,tip:`Pro-Tip`,warning:`Caution`,alert:`Critical Alert`,"key-takeaways":`Executive Summary & Key Takeaways`},r=t[e.type]||t.info,i=e.title||n[e.type]||`Note`;return`
<aside class="tt-callout tt-callout-${e.type}" style="border-left: 4px solid ${r}; background: oklch(0.15 0.02 240); padding: 1rem 1.25rem; border-radius: 0 8px 8px 0; margin: 1.5rem 0;">
  <div class="tt-callout-title" style="font-weight: 700; font-size: 0.9375rem; color: ${r}; margin-bottom: 0.5rem;">${Y(i)}</div>
  <div class="tt-callout-body" style="font-size: 0.9375rem; line-height: 1.6; color: oklch(0.9 0.02 240);">
    ${e.contentHtml}
  </div>
</aside>`.trim()}function Te(e){return e.length===0?``:`
<nav class="tt-breadcrumbs" aria-label="Breadcrumb" style="margin-bottom: 1.25rem;">
  <ol itemscope itemtype="https://schema.org/BreadcrumbList" style="list-style: none; padding: 0; margin: 0; display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem; font-size: 0.8125rem; color: oklch(0.7 0.02 240);">
    ${e.map((t,n)=>{let r=n===e.length-1,i=r?``:`<span class="tt-breadcrumb-separator" aria-hidden="true" style="color: oklch(0.4 0.02 240);">/</span>`,a=t.position??n+1;return`
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem" style="display: inline-flex; align-items: center; gap: 0.5rem;">
      ${r?`<span itemprop="name" style="color: oklch(0.85 0.02 240); font-weight: 500;">${Y(t.name)}</span>`:`<a itemprop="item" href="${Y(t.url)}" style="color: oklch(0.7 0.2 200); text-decoration: none;"><span itemprop="name">${Y(t.name)}</span></a>`}
      <meta itemprop="position" content="${a}" />
      ${i}
    </li>`}).join(``)}
  </ol>
</nav>`.trim()}function Ee(e){return`
<aside class="tt-audio-narration-player" aria-label="Audio Narration" style="background: oklch(0.12 0.03 240); border: 1px solid oklch(0.25 0.02 240); border-radius: 8px; padding: 1rem 1.25rem; margin: 1.5rem 0;">
  <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #00E5FF;"></span>
      <span style="font-weight: 700; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em; color: #00E5FF;">Listen to this article</span>
      <span style="font-size: 0.8125rem; color: oklch(0.65 0.02 240);">(${e.durationFormatted||(e.durationSeconds?`${Math.round(e.durationSeconds/60)} min listen`:`Audio narration`)})</span>
    </div>
    <span style="font-size: 0.75rem; color: oklch(0.7 0.02 240);">${e.narratorName?`Narrated by ${Y(e.narratorName)}`:`AI Voice Narration (Edge TTS)`}</span>
  </div>
  <audio controls preload="none" style="width: 100%; height: 36px; border-radius: 4px;">
    <source src="${Y(e.audioUrl)}" type="audio/mpeg" />
    Your browser does not support the audio element.
  </audio>
  <div style="display: flex; justify-content: flex-end; gap: 1rem; margin-top: 0.5rem; font-size: 0.75rem;">
    ${e.downloadUrl?`<a href="${Y(e.downloadUrl)}" download style="color: oklch(0.7 0.2 200); text-decoration: none;">Download MP3</a>`:``}
    ${e.transcriptUrl?`<a href="${Y(e.transcriptUrl)}" style="color: oklch(0.7 0.2 200); text-decoration: none;">Read Transcript</a>`:``}
  </div>
</aside>`.trim()}function De(e){let t=[];if(e.sameAs)for(let n of e.sameAs)n.includes(`orcid.org`)?t.push(`<a href="${Y(n)}" target="_blank" rel="noopener noreferrer" style="color: #A6CE39; font-weight: 600; text-decoration: none; font-size: 0.75rem; padding: 0.2rem 0.5rem; background: oklch(0.18 0.02 240); border: 1px solid oklch(0.3 0.02 240); border-radius: 4px;">ORCID ↗</a>`):n.includes(`wikidata.org`)?t.push(`<a href="${Y(n)}" target="_blank" rel="noopener noreferrer" style="color: #339966; font-weight: 600; text-decoration: none; font-size: 0.75rem; padding: 0.2rem 0.5rem; background: oklch(0.18 0.02 240); border: 1px solid oklch(0.3 0.02 240); border-radius: 4px;">Wikidata ↗</a>`):n.includes(`github.com`)?t.push(`<a href="${Y(n)}" target="_blank" rel="noopener noreferrer" style="color: #FFFFFF; font-weight: 600; text-decoration: none; font-size: 0.75rem; padding: 0.2rem 0.5rem; background: oklch(0.18 0.02 240); border: 1px solid oklch(0.3 0.02 240); border-radius: 4px;">GitHub ↗</a>`):n.includes(`linkedin.com`)?t.push(`<a href="${Y(n)}" target="_blank" rel="noopener noreferrer" style="color: #0A66C2; font-weight: 600; text-decoration: none; font-size: 0.75rem; padding: 0.2rem 0.5rem; background: oklch(0.18 0.02 240); border: 1px solid oklch(0.3 0.02 240); border-radius: 4px;">LinkedIn ↗</a>`):(n.includes(`x.com`)||n.includes(`twitter.com`))&&t.push(`<a href="${Y(n)}" target="_blank" rel="noopener noreferrer" style="color: #00E5FF; font-weight: 600; text-decoration: none; font-size: 0.75rem; padding: 0.2rem 0.5rem; background: oklch(0.18 0.02 240); border: 1px solid oklch(0.3 0.02 240); border-radius: 4px;">X ↗</a>`);return`
<section class="tt-author-bio-card" style="display: flex; gap: 1.25rem; align-items: flex-start; padding: 1.5rem; background: oklch(0.13 0.02 240); border: 1px solid oklch(0.25 0.02 240); border-radius: 8px; margin: 2.5rem 0;">
  ${e.avatarUrl?`
  <div style="flex-shrink: 0; width: 64px; height: 64px; border-radius: 50%; overflow: hidden; aspect-ratio: 1 / 1; border: 2px solid #00E5FF; background: #060610;">
    <img src="${Y(e.avatarUrl)}" alt="${Y(e.name)}" width="64" height="64" loading="lazy" style="width: 100%; height: 100%; object-fit: cover;" />
  </div>`:``}
  <div style="flex: 1; min-width: 0;">
    <div style="display: flex; flex-wrap: wrap; align-items: baseline; gap: 0.5rem; margin-bottom: 0.25rem;">
      <h3 style="margin: 0; font-size: 1.125rem; font-weight: 700; color: #FFFFFF;">${Y(e.name)}</h3>
      ${e.role?`<span style="font-size: 0.8125rem; color: oklch(0.7 0.2 200); font-weight: 500;">${Y(e.role)}</span>`:``}
    </div>
    <p style="margin: 0 0 0.75rem 0; font-size: 0.875rem; line-height: 1.6; color: oklch(0.85 0.02 240);">${Y(e.bio)}</p>
    ${t.length>0?`<div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">${t.join(``)}</div>`:``}
  </div>
</section>`.trim()}function Oe(e){let t=encodeURIComponent(e.url),n=encodeURIComponent(e.title);return`
<div class="tt-social-share-bar" style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem; padding: 1rem 0; border-top: 1px solid oklch(0.22 0.02 240); border-bottom: 1px solid oklch(0.22 0.02 240); margin: 2rem 0;">
  <span style="font-weight: 600; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em; color: oklch(0.7 0.02 240);">Share this post</span>
  <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
    <a href="${`https://twitter.com/intent/tweet?text=${n}&url=${t}`}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; padding: 0.35rem 0.75rem; background: oklch(0.18 0.02 240); color: #FFFFFF; font-size: 0.75rem; font-weight: 600; border-radius: 4px; text-decoration: none; border: 1px solid oklch(0.28 0.02 240);">Post on X</a>
    <a href="${`https://www.linkedin.com/sharing/share-offsite/?url=${t}`}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; padding: 0.35rem 0.75rem; background: oklch(0.18 0.02 240); color: #0A66C2; font-size: 0.75rem; font-weight: 600; border-radius: 4px; text-decoration: none; border: 1px solid oklch(0.28 0.02 240);">LinkedIn</a>
    <a href="${`https://news.ycombinator.com/submitlink?u=${t}&t=${n}`}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; padding: 0.35rem 0.75rem; background: oklch(0.18 0.02 240); color: #FF6600; font-size: 0.75rem; font-weight: 600; border-radius: 4px; text-decoration: none; border: 1px solid oklch(0.28 0.02 240);">Hacker News</a>
  </div>
</div>`.trim()}function ke(){return`<style>
  .tt-reading-progress-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, #00E5FF, #7928CA);
    transform-origin: 0 50%;
    transform: scaleX(0);
    z-index: 9999;
    display: none;
  }
  @keyframes tt-reading-progress {
    from { transform: scaleX(0); }
    to { transform: scaleX(1); }
  }
  @supports (animation-timeline: scroll()) {
    @media (prefers-reduced-motion: no-preference) {
      .tt-reading-progress-bar {
        display: block;
        animation: tt-reading-progress linear both;
        animation-timeline: scroll();
      }
    }
  }
</style>
<div class="tt-reading-progress-bar" aria-hidden="true"></div>`}function Ae(e){return e.length===0?``:`
<section class="tt-related-articles-section" style="margin-top: 3.5rem; padding-top: 2rem; border-top: 1px solid oklch(0.25 0.02 240);">
  <h2 style="font-size: 1.375rem; font-weight: 700; color: #FFFFFF; margin-bottom: 1.5rem;">Related Articles in Topic Cluster</h2>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.25rem;">
    ${e.map(e=>`
    <article class="tt-related-card" style="background: oklch(0.13 0.02 240); border: 1px solid oklch(0.25 0.02 240); border-radius: 8px; overflow: hidden; display: flex; flex-direction: column;">
      ${e.heroImageUrl?`
      <div style="aspect-ratio: 16 / 9; overflow: hidden; background: #060610;">
        <img src="${Y(e.heroImageUrl)}" alt="${Y(e.title)}" width="400" height="225" loading="lazy" style="width: 100%; height: 100%; object-fit: cover;" />
      </div>`:``}
      <div style="padding: 1rem; flex: 1; display: flex; flex-direction: column;">
        ${e.category?`<span style="font-size: 0.6875rem; font-weight: 700; text-transform: uppercase; color: #00E5FF; margin-bottom: 0.5rem; letter-spacing: 0.05em;">${Y(e.category)}</span>`:``}
        <h3 style="font-size: 1rem; font-weight: 600; margin: 0 0 0.5rem 0; line-height: 1.4;">
          <a href="${Y(e.url)}" style="color: #FFFFFF; text-decoration: none;">${Y(e.title)}</a>
        </h3>
        <p style="font-size: 0.8125rem; color: oklch(0.75 0.02 240); line-height: 1.5; margin: 0 0 1rem 0; flex: 1;">${Y(e.summary)}</p>
        ${e.readingTimeMinutes?`<span style="font-size: 0.75rem; color: oklch(0.6 0.02 240);">${e.readingTimeMinutes} min read</span>`:``}
      </div>
    </article>`).join(`
`)}
  </div>
</section>`.trim()}function je(e){let t=e.brandName||`Megabyte Labs`,n=e.category||`TECHNICAL EDITORIAL`,r=e.readingTimeMinutes?`${e.readingTimeMinutes} MIN READ`:`5 MIN READ`,i=e=>e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`),a=e.title.split(` `),o=[],s=``;for(let e of a)(s+` `+e).length>32?(s&&o.push(s),s=e):s=s?`${s} ${e}`:e;s&&o.push(s);let c=o.slice(0,3).map((e,t)=>`<tspan x="80" y="${260+t*58}">${i(e)}</tspan>`).join(``);return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#060610" />
      <stop offset="60%" stop-color="#0B0C1E" />
      <stop offset="100%" stop-color="#020208" />
    </linearGradient>
    <radialGradient id="cyanGlow" cx="90%" cy="10%" r="50%">
      <stop offset="0%" stop-color="#00E5FF" stop-opacity="0.18" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="violetGlow" cx="10%" cy="90%" r="50%">
      <stop offset="0%" stop-color="#7928CA" stop-opacity="0.22" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0" />
    </radialGradient>
  </defs>

  <!-- Background Base -->
  <rect width="1200" height="630" fill="url(#bgGrad)" />
  <rect width="1200" height="630" fill="url(#cyanGlow)" />
  <rect width="1200" height="630" fill="url(#violetGlow)" />

  <!-- Outer Border -->
  <rect x="20" y="20" width="1160" height="590" rx="16" fill="none" stroke="rgba(255, 255, 255, 0.08)" stroke-width="2" />

  <!-- Top Metadata Bar -->
  <g transform="translate(80, 90)">
    <!-- Category Badge -->
    <rect x="0" y="0" width="${n.length*9+28}" height="32" rx="16" fill="rgba(0, 229, 255, 0.12)" stroke="#00E5FF" stroke-width="1.5" />
    <text x="14" y="21" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#00E5FF" letter-spacing="1.5">${i(n.toUpperCase())}</text>

    <!-- Reading Time -->
    <text x="${n.length*9+48}" y="21" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="600" fill="#94A3B8" letter-spacing="1">${r}</text>
  </g>

  <!-- Title Text -->
  <text font-family="system-ui, -apple-system, sans-serif" font-size="48" font-weight="800" fill="#FFFFFF" letter-spacing="-0.5">
    ${c}
  </text>

  <!-- Subtitle -->
  ${e.subtitle?`
  <text x="80" y="${280+Math.min(o.length,3)*58}" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="400" fill="#94A3B8">
    ${i(e.subtitle.slice(0,90))}
  </text>`:``}

  <!-- Footer Info Bar -->
  <g transform="translate(80, 530)">
    <circle cx="20" cy="20" r="20" fill="#00E5FF" />
    <text x="20" y="26" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="800" fill="#060610" text-anchor="middle">${i(e.authorName.charAt(0))}</text>
    <text x="54" y="18" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="700" fill="#FFFFFF">${i(e.authorName)}</text>
    <text x="54" y="36" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="500" fill="#64748B">${i(t)}</text>

    <!-- Right Brand Badge -->
    <text x="1040" y="27" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="800" fill="#00E5FF" text-anchor="end" letter-spacing="1">${i(t.toUpperCase())}</text>
  </g>
</svg>`.trim()}function Y(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#039;`)}({id:`blog`,canonicalPackage:`@theme.tools/blog`,tier:`core-workspace`,layer:`engines`,version:`1.0.0`,title:`ArticleDocument v1.0.0, Plate Studio & 100 Editorial Components`,summary:`Lossless Plate <-> ArticleDocument v1.0.0 serialization, citation/media/data validators, and 20 article fixtures.`,healthPath:`/api/health/blog`,requiredBindings:[`D1`,`R2`,`KV`]}).id;function X(e){return`
<style>
  :host {
    display: block;
    box-sizing: border-box;
    font-family: system-ui, -apple-system, sans-serif;
    --tt-transition: all 0.333s cubic-bezier(0.16, 1, 0.3, 1);
    --tt-border: oklch(0.3 0.02 240);
    --tt-bg: oklch(0.14 0.02 240);
    --tt-accent: oklch(0.7 0.2 200);
  }
  .article-container {
    background: var(--tt-bg);
    border: 1px solid var(--tt-border);
    border-radius: 8px;
    padding: 1.5rem;
    transition: var(--tt-transition);
  }
  .header {
    border-bottom: 1px solid var(--tt-border);
    padding-bottom: 1rem;
    margin-bottom: 1rem;
  }
  .title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #FFFFFF;
    margin: 0 0 0.5rem 0;
  }
  .meta {
    font-size: 0.875rem;
    color: oklch(0.7 0.02 240);
  }
  .toc-title {
    font-size: 0.875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--tt-accent);
    margin-bottom: 0.5rem;
  }
  .toc-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .toc-item {
    margin-bottom: 0.375rem;
  }
  .toc-link {
    color: oklch(0.8 0.02 240);
    text-decoration: none;
    font-size: 0.875rem;
    transition: var(--tt-transition);
  }
  .toc-link:hover {
    color: var(--tt-accent);
  }
  :host { --tt-transition-oklch: 0.333s cubic-bezier(0.22, 1, 0.36, 1); --tt-target-min-size: 24px; --tt-focus-ring-oklch: oklch(0.84 0.17 198); } .tt-spring-press:active { transform: scale(0.975); } :focus-visible { outline: 2px solid var(--tt-focus-ring-oklch); outline-offset: 2px; }
</style>
<div class="article-container" data-ripple="true" data-spotlight="true" data-magnetic="true" data-wcag-target-size="24x24" role="article" aria-label="${e.title}">
  <header class="header">
    <h1 class="title">${e.title}</h1>
    <div class="meta">${e.readingTimeMinutes} min read</div>
  </header>
  <nav class="toc" aria-label="Table of Contents">
    <div class="toc-title">Table of Contents</div>
    <ul class="toc-list">
      ${e.headings.map(e=>`<li class="toc-item" style="padding-left: ${(e.level-2)*1}rem;">
              <a class="toc-link" href="#${e.id}">${e.text}</a>
            </li>`).join(``)}
    </ul>
  </nav>
</div>
`.trim()}var Z=class extends Error{constructor(e){super(e),this.name=`ComponentError`}};function Me(e,t){return{render:t=>le(e,t),cssVar:`WIDGET_CSS`,module:`widgets`,description:t}}function Ne(e,t){return{render:t=>ye(e,t),cssVar:`MEDIA_CSS`,module:`media`,description:t}}var Pe={callout:`Coloured note/aside (info · warning · success · tip).`,takeaways:`Key-takeaways bullet summary box.`,comparison:`Side-by-side comparison table of options.`,steps:`Ordered how-to step sequence.`,faq:`Accessible Q&A accordion (FAQPage-ready).`,timeline:`Vertical dated timeline of events/milestones.`,"stat-cards":`Grid of headline stat cards (value + label).`,"pros-cons":`Two-column pros vs cons list.`,glossary:`Term → definition glossary list.`,pullquote:`Emphasised pull-quote with optional attribution.`,"platform-tabs":`Tabbed per-platform content (Windows/macOS/Linux).`,"spec-table":`Technical specification key/value table.`,scorecard:`Weighted scorecard with criteria + overall rating.`,accordion:`Generic expand/collapse accordion of sections.`},Fe={featured:`Hero / featured image with optional caption (CLS-safe 1200×630).`,gallery:`Lightbox-ready responsive image gallery grid.`,"video-browser":`Tabbed YouTube video browser with click-to-play facades.`},Q={...Object.fromEntries(m.map(e=>[e,Me(e,Pe[e])])),...Object.fromEntries(F.map(e=>[e,Ne(e,Fe[e])])),"responsive-picture":{render:e=>xe(e),cssVar:`SELF_CONTAINED`,module:`multimedia`,description:`AVIF/WebP responsive <picture> with aspect-ratio CLS guard + optional caption.`},"cf-stream-embed":{render:e=>Se(e),cssVar:`SELF_CONTAINED`,module:`multimedia`,description:`Cloudflare Stream video embed with optional transcript disclosure.`},"code-block":{render:e=>Ce(e),cssVar:`SELF_CONTAINED`,module:`multimedia`,description:`Syntax-labelled code block with filename + language header.`},"callout-block":{render:e=>we(e),cssVar:`SELF_CONTAINED`,module:`multimedia`,description:`Rich inline-HTML callout (info · tip · warning · alert · key-takeaways).`},breadcrumbs:{render:e=>Te(e),cssVar:`SELF_CONTAINED`,module:`multimedia`,description:`schema.org BreadcrumbList trail (accepts a BreadcrumbItem[]).`},"audio-narration":{render:e=>Ee(e),cssVar:`SELF_CONTAINED`,module:`multimedia`,description:`Listen-to-this-article audio player with transcript/download links.`},"author-bio":{render:e=>De(e),cssVar:`SELF_CONTAINED`,module:`multimedia`,description:`Author bio card with avatar + sameAs entity badges (ORCID/GitHub/etc).`},"social-share":{render:e=>Oe(e),cssVar:`SELF_CONTAINED`,module:`multimedia`,description:`Share-this-post bar (X · LinkedIn · Hacker News).`},"reading-progress":{render:e=>ke(),cssVar:`SELF_CONTAINED`,module:`multimedia`,description:`Scroll-driven reading-progress bar (CSS scroll timeline; ignores data).`},"related-articles-grid":{render:e=>Ae(e),cssVar:`SELF_CONTAINED`,module:`multimedia`,description:`Topic-cluster related-articles card grid (accepts a RelatedArticleConfig[]).`},"og-card-svg":{render:e=>je(e),cssVar:`SELF_CONTAINED`,module:`multimedia`,description:`Branded 1200×630 Open Graph card as inline SVG.`},"article-reader":{render:e=>X(e),cssVar:`SELF_CONTAINED`,module:`elements`,description:`<tt-article-reader> shadow-DOM reader shell with table-of-contents.`}},$=Object.keys(Q);function Ie(e,t){let n=Q[e];if(!n)throw new Z(`Unknown component "${e}". Expected one of: ${$.join(`, `)}`);return n.render(t)}`${ue}${be}`,$.map(e=>{let t=Q[e];return{type:e,module:t.module,cssVar:t.cssVar,description:t.description}});export{l as a,f as c,u as i,X as n,p as o,d as r,o as s,Ie as t};
//# sourceMappingURL=theme-tools-blog-IbutbxGf.js.map