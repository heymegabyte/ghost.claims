/* A deliberately network-only service worker. It keeps the existing registration
 * valid without caching API or HTML responses that must remain fresh. */
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));
