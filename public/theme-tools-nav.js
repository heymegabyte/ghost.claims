(function(){
  if(window.__ttNavMenu)return;window.__ttNavMenu=true;
  var CLOSE_DELAY=170;
  function mobile(){return window.matchMedia&&window.matchMedia('(max-width: 860px)').matches;}
  function triggersOf(r){return Array.prototype.slice.call(r.querySelectorAll('[data-tt-nav-trigger]'));}
  function panelFor(t){return t.parentNode?t.parentNode.querySelector('.tt-nav__mm-panel'):null;}
  function itemsOf(p){return p?Array.prototype.slice.call(p.querySelectorAll('.tt-nav__mm-item')):[];}
  function closeAll(r,ex){triggersOf(r).forEach(function(t){if(t!==ex)t.setAttribute('aria-expanded','false');});}
  function open(r,t){closeAll(r,t);t.setAttribute('aria-expanded','true');}
  function close(t){t.setAttribute('aria-expanded','false');}
  function roving(r,a){triggersOf(r).forEach(function(t){t.setAttribute('tabindex',t===a?'0':'-1');});}
  document.querySelectorAll('[data-tt-nav-root]').forEach(function(root){
    var bar=root.querySelector('.tt-nav__mm-bar');
    var header=root.closest?root.closest('.tt-nav'):null;
    var burger=header?header.querySelector('[data-tt-nav-burger]'):null;
    var triggers=triggersOf(root);
    var timer=null;
    if(burger&&bar){
      burger.addEventListener('click',function(){
        var o=root.getAttribute('data-tt-nav-open')==='true';
        root.setAttribute('data-tt-nav-open',o?'false':'true');
        burger.setAttribute('aria-expanded',o?'false':'true');
        if(o)closeAll(root,null);
      });
    }
    triggers.forEach(function(trigger,idx){
      var panel=panelFor(trigger);
      trigger.addEventListener('click',function(e){
        var isOpen=trigger.getAttribute('aria-expanded')==='true';
        if(isOpen){close(trigger);}else{open(root,trigger);}
        e.preventDefault();
      });
      if(trigger.parentNode){
        trigger.parentNode.addEventListener('mouseenter',function(){
          if(mobile())return;
          if(timer){clearTimeout(timer);timer=null;}
          open(root,trigger);
        });
        trigger.parentNode.addEventListener('mouseleave',function(){
          if(mobile())return;
          if(timer)clearTimeout(timer);
          timer=setTimeout(function(){close(trigger);},CLOSE_DELAY);
        });
      }
      trigger.addEventListener('keydown',function(e){
        var k=e.key;
        if(k==='ArrowRight'){e.preventDefault();var n=triggers[(idx+1)%triggers.length];roving(root,n);n.focus();}
        else if(k==='ArrowLeft'){e.preventDefault();var p=triggers[(idx-1+triggers.length)%triggers.length];roving(root,p);p.focus();}
        else if(k==='ArrowDown'||k==='Enter'||k===' '){e.preventDefault();open(root,trigger);var it=itemsOf(panel);if(it.length)it[0].focus();}
        else if(k==='Escape'){close(trigger);}
        else if(k==='Home'){e.preventDefault();roving(root,triggers[0]);triggers[0].focus();}
        else if(k==='End'){e.preventDefault();var l=triggers[triggers.length-1];roving(root,l);l.focus();}
      });
      if(panel){
        panel.addEventListener('keydown',function(e){
          var it=itemsOf(panel);var ci=it.indexOf(document.activeElement);var k=e.key;
          if(k==='ArrowDown'){e.preventDefault();(it[ci+1]||it[0]).focus();}
          else if(k==='ArrowUp'){e.preventDefault();if(ci<=0){trigger.focus();}else{it[ci-1].focus();}}
          else if(k==='Escape'){e.preventDefault();close(trigger);trigger.focus();}
          else if(k==='Home'){e.preventDefault();if(it[0])it[0].focus();}
          else if(k==='End'){e.preventDefault();if(it.length)it[it.length-1].focus();}
          else if(k==='Tab'){close(trigger);}
        });
      }
    });
    document.addEventListener('click',function(e){if(root.contains(e.target))return;closeAll(root,null);});
    root.addEventListener('focusout',function(){setTimeout(function(){if(!root.contains(document.activeElement)&&!mobile())closeAll(root,null);},0);});
  });
})();
(function(){
  /* Compact-overlay mega-menu driver: open/close + focus trap + Esc + roving-arrow desk grid +
     live featured swap + global "/" and Cmd/Ctrl+K to open & focus search. CSP-safe (no innerHTML
     on untrusted data — only element attributes the server set), idempotent, reduced-motion agnostic. */
  var FOCUSABLE='a[href],button:not([disabled]),input,[tabindex]:not([tabindex="-1"])';
  function boot(scope){
  (scope||document).querySelectorAll('[data-tt-ov-trigger]').forEach(function(trigger){
    if(trigger.hasAttribute('data-tt-ov-ready'))return;
    trigger.setAttribute('data-tt-ov-ready','true');
    var id=trigger.getAttribute('aria-controls');
    var panel=id?document.getElementById(id):null;if(!panel)return;
    var scrim=panel.querySelector('[data-tt-ov-scrim]');
    var closeBtn=panel.querySelector('[data-tt-ov-close]');
    var searchInput=panel.querySelector('[data-tt-ov-search]');
    var searchBtn=trigger.parentNode?trigger.parentNode.querySelector('[data-tt-ov-searchbtn]'):null;
    var cards=Array.prototype.slice.call(panel.querySelectorAll('[data-tt-ov-card]'));
    var featuredImg=panel.querySelector('[data-tt-ov-fimg]');
    var featuredLink=panel.querySelector('[data-tt-ov-featured]');
    var fKicker=featuredLink?featuredLink.querySelector('[data-tt-ov-fkicker]'):null;
    var fTitle=featuredLink?featuredLink.querySelector('[data-tt-ov-ftitle]'):null;
    var lastFocus=null,swapT=null;
    function markCurrentRoute(){
      var here=location.pathname.replace(/\/+$/,'')||'/';
      Array.prototype.forEach.call(panel.querySelectorAll('a[href]'),function(link){
        var current=false;
        try{var url=new URL(link.getAttribute('href'),location.href);var path=url.pathname.replace(/\/+$/,'')||'/';current=url.origin===location.origin&&path===here;}catch(e){}
        if(current){link.setAttribute('aria-current','page');link.setAttribute('data-tt-ov-current','1');}
        else{link.removeAttribute('aria-current');link.removeAttribute('data-tt-ov-current');}
      });
    }
    function cols(){ // how many cards per row (for up/down arrows) — read the computed grid
      try{var s=getComputedStyle(panel.querySelector('.tt-ov__grid'));var n=s.gridTemplateColumns.split(' ').length;return n>0?n:3;}catch(e){return 3;}}
    function setFeatured(card){
      if(!featuredImg||!card)return;
      var src=card.getAttribute('data-tt-ov-fsrc');if(!src)return;
      var alt=card.getAttribute('data-tt-ov-falt');
      var ttl=card.getAttribute('data-tt-ov-ftitle')||'';
      var href=card.getAttribute('data-tt-ov-fhref');
      if(fKicker)fKicker.textContent=card.getAttribute('data-tt-ov-fkicker')||'';
      if(fTitle)fTitle.textContent=ttl;
      if(featuredLink){if(href)featuredLink.setAttribute('href',href);if(ttl)featuredLink.setAttribute('aria-label',ttl);}
      if(alt)featuredImg.setAttribute('alt',alt);
      if(swapT){clearTimeout(swapT);swapT=null;}
      if(featuredImg.getAttribute('src')===src){featuredImg.removeAttribute('data-tt-ov-swapping');return;}
      featuredImg.setAttribute('data-tt-ov-swapping','1');
      swapT=setTimeout(function(){
        featuredImg.setAttribute('src',src);
        featuredImg.removeAttribute('data-tt-ov-swapping');
        swapT=null;
      },140);
    }
    function markActive(card){cards.forEach(function(c){if(c===card)c.setAttribute('data-tt-ov-active','1');else c.removeAttribute('data-tt-ov-active');});}
    function isOpen(){return trigger.getAttribute('aria-expanded')==='true';}
    function open(focusSearch){
      if(isOpen())return;lastFocus=document.activeElement;
      markCurrentRoute();
      panel.hidden=false;
      // next frame so the transition runs from the hidden→shown state
      requestAnimationFrame(function(){panel.setAttribute('data-tt-ov-open','1');});
      trigger.setAttribute('aria-expanded','true');
      document.documentElement.style.overflow='hidden';
      cards.forEach(function(c,i){c.setAttribute('tabindex',i===0?'0':'-1');});
      var target=(focusSearch&&searchInput)?searchInput:(cards[0]||closeBtn||searchInput);
      if(target)setTimeout(function(){target.focus();},60);
    }
    function close(restore){
      if(!isOpen())return;
      panel.removeAttribute('data-tt-ov-open');
      trigger.setAttribute('aria-expanded','false');
      document.documentElement.style.overflow='';
      var done=function(){panel.hidden=true;};
      // allow the close transition to play unless reduced-motion
      var rm=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if(rm){done();}else{setTimeout(done,360);}
      if(restore!==false){var t=lastFocus&&lastFocus.focus?lastFocus:trigger;setTimeout(function(){t.focus();},0);}
    }
    trigger.addEventListener('click',function(e){e.preventDefault();if(isOpen())close();else open(false);});
    if(searchBtn)searchBtn.addEventListener('click',function(e){e.preventDefault();open(true);});
    if(scrim)scrim.addEventListener('click',function(){close();});
    if(closeBtn)closeBtn.addEventListener('click',function(){close();});
    // Live featured swap on card hover/focus
    cards.forEach(function(card,idx){
      card.addEventListener('mouseenter',function(){setFeatured(card);markActive(card);});
      card.addEventListener('focus',function(){setFeatured(card);markActive(card);cards.forEach(function(c,i){c.setAttribute('tabindex',i===idx?'0':'-1');});});
      card.addEventListener('keydown',function(e){
        var k=e.key,n=cols(),next=-1;
        if(k==='ArrowRight')next=(idx+1)%cards.length;
        else if(k==='ArrowLeft')next=(idx-1+cards.length)%cards.length;
        else if(k==='ArrowDown')next=Math.min(cards.length-1,idx+n);
        else if(k==='ArrowUp')next=Math.max(0,idx-n);
        else if(k==='Home')next=0;
        else if(k==='End')next=cards.length-1;
        if(next>=0){e.preventDefault();var t=cards[next];cards.forEach(function(c,i){c.setAttribute('tabindex',i===next?'0':'-1');});t.focus();}
      });
    });
    // Focus trap + Esc, scoped to the panel
    panel.addEventListener('keydown',function(e){
      if(e.key==='Escape'){e.preventDefault();close();return;}
      if(e.key!=='Tab')return;
      var f=Array.prototype.slice.call(panel.querySelectorAll(FOCUSABLE)).filter(function(el){return el.offsetParent!==null||el===document.activeElement;});
      if(!f.length)return;var first=f[0],last=f[f.length-1];
      if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
      else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
    });
  });
  }
  boot(document);
  if(!window.__ttNavOverlayObserver&&window.MutationObserver){
    window.__ttNavOverlayObserver=new MutationObserver(function(records){records.forEach(function(record){
      Array.prototype.forEach.call(record.addedNodes||[],function(node){if(node&&node.querySelectorAll)boot(node);});
    });});
    window.__ttNavOverlayObserver.observe(document.documentElement,{childList:true,subtree:true});
  }
  // Global shortcuts: "/" or Cmd/Ctrl+K opens the FIRST overlay + focuses its search (not while typing).
  // Prefer the resting search affordance's own click (runs the canonical open(true) path); else the trigger.
  if(window.__ttNavOverlayShortcuts)return;window.__ttNavOverlayShortcuts=true;
  document.addEventListener('keydown',function(e){
    var slash=e.key==='/'&&!e.metaKey&&!e.ctrlKey&&!e.altKey;
    var cmdk=(e.key==='k'||e.key==='K')&&(e.metaKey||e.ctrlKey);
    if(!slash&&!cmdk)return;
    var ae=document.activeElement,tag=ae?ae.tagName:'';
    if(slash&&(tag==='INPUT'||tag==='TEXTAREA'||tag==='SELECT'||(ae&&ae.isContentEditable)))return;
    var trigger=document.querySelector('[data-tt-ov-trigger]');if(!trigger)return;
    if(trigger.getAttribute('aria-expanded')==='true')return; // already open — let native focus flow
    e.preventDefault();
    var header=trigger.closest?trigger.closest('.tt-nav'):null;
    var searchBtn=header?header.querySelector('[data-tt-ov-searchbtn]'):null;
    if(searchBtn){searchBtn.click();}else{trigger.click();}
  });
})();
(function(){
  if(window.__ghostSignalOverlayNavigation)return;window.__ghostSignalOverlayNavigation=true;
  document.addEventListener('click',function(event){
    var node=event.target;var link=node&&node.closest?node.closest('[data-tt-ov-panel] a[href]'):null;
    if(!link)return;
    var panel=link.closest('[data-tt-ov-panel]');var closeButton=panel&&panel.querySelector('[data-tt-ov-close]');
    var raw=link.getAttribute('href');var url;
    try{url=new URL(raw,location.href);}catch(error){if(closeButton)closeButton.click();return;}
    var sameDocument=url.origin===location.origin&&url.pathname===location.pathname&&url.search===location.search;
    if(closeButton)closeButton.click();
    if(!sameDocument||!url.hash)return;
    event.preventDefault();
    var previousHash=location.hash;
    location.hash=url.hash;
    if(previousHash===url.hash&&window.HashChangeEvent)window.dispatchEvent(new HashChangeEvent('hashchange'));
    var target=document.getElementById(decodeURIComponent(url.hash.slice(1)));
    if(target)setTimeout(function(){target.scrollIntoView({block:'start'});},0);
  });
})();
