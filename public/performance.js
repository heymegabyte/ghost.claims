/* Ghost Signal — progressive loading and runtime performance guardrails */
(() => {
  const root = document.documentElement;
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const saveData = Boolean(connection?.saveData);
  const constrainedConnection = /(^|-)2g$/.test(connection?.effectiveType || "");
  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

  if (saveData || constrainedConnection) root.dataset.saveData = "true";
  if (reducedMotion) root.dataset.runtimeReducedMotion = "true";

  function activateHeroVideo() {
    if (saveData || constrainedConnection || reducedMotion || matchMedia("(max-width: 700px)").matches) return;
    const video = document.querySelector(".hero-video");
    const source = video?.querySelector("source[data-src]");
    if (!video || !source || source.src) return;
    source.src = source.dataset.src;
    video.load();
    video.play().catch(() => {});
  }

  const hero = document.querySelector(".hero-stage");
  if (hero && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      activateHeroVideo();
    }, { rootMargin: "150px" });
    observer.observe(hero);
  } else {
    activateHeroVideo();
  }

  const deferredMedia = document.querySelectorAll("img[data-src], iframe[data-src], video[data-poster], [data-bg-src]");
  const loadMedia = (element) => {
    if (element.dataset.bgSrc) {
      element.style.backgroundImage = `url("${element.dataset.bgSrc}")`;
      delete element.dataset.bgSrc;
      return;
    }
    if (element.dataset.poster) {
      element.poster = element.dataset.poster;
      delete element.dataset.poster;
    }
    if (!element.dataset.src) return;
    element.parentElement?.querySelectorAll("source[data-srcset]").forEach((source) => {
      source.srcset = source.dataset.srcset;
      delete source.dataset.srcset;
    });
    element.src = element.dataset.src;
    delete element.dataset.src;
  };
  if ("IntersectionObserver" in window) {
    const mediaObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        mediaObserver.unobserve(entry.target);
        loadMedia(entry.target);
      }
    }, { rootMargin: "400px 0px" });
    deferredMedia.forEach((element) => mediaObserver.observe(element));
  } else {
    deferredMedia.forEach(loadMedia);
  }

  let featuresPromise;
  function loadOptionalFeatures() {
    if (featuresPromise) return featuresPromise;
    featuresPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "/features.js?v=20261114";
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
    return featuresPromise;
  }

  const featureSelector = "[data-action^='start-'],[data-action^='open-'],#sonify-toggle,[data-component='avatar-slideshow'],[data-component='rock-scene']";
  document.addEventListener("pointerover", (event) => {
    if (event.target.closest?.(featureSelector)) loadOptionalFeatures();
  }, { passive: true });
  document.addEventListener("touchstart", (event) => {
    if (event.target.closest?.(featureSelector)) loadOptionalFeatures();
  }, { passive: true });
  document.addEventListener("focusin", (event) => {
    if (event.target.closest?.(featureSelector)) loadOptionalFeatures();
  });

  if ("PerformanceObserver" in window) {
    const metrics = { longTasks: 0, longTaskDuration: 0, cls: 0 };
    try {
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          metrics.longTasks += 1;
          metrics.longTaskDuration += entry.duration;
        }
      }).observe({ type: "longtask", buffered: true });
    } catch {}
    try {
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) if (!entry.hadRecentInput) metrics.cls += entry.value;
      }).observe({ type: "layout-shift", buffered: true });
    } catch {}
    window.__ghostPerformance = metrics;
  }
})();
