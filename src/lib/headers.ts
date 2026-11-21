export function applyResponseHeaders(response: Response, headers: HeadersInit): Response {
  const next = new Response(response.body, response);

  new Headers(headers).forEach((value, key) => {
    next.headers.set(key, value);
  });

  return next;
}

export function getSecurityHeaders(pathname: string): Headers {
  const headers = new Headers({
    "referrer-policy": "strict-origin-when-cross-origin",
    "x-content-type-options": "nosniff",
    "x-frame-options": "DENY",
    "permissions-policy": "geolocation=(), microphone=(), camera=()",
    "strict-transport-security": "max-age=31536000; includeSubDomains; preload",
  });

  if (pathname.startsWith("/api/docs")) {
    headers.set(
      "content-security-policy",
      "default-src 'self' https: data: blob: 'unsafe-inline' 'unsafe-eval'; frame-ancestors 'none'; base-uri 'self';",
    );
    return headers;
  }

  headers.set(
    "content-security-policy",
    [
      "default-src 'self'",
      "base-uri 'self'",
      "frame-ancestors 'none'",
      "img-src 'self' data: blob:",
      "object-src 'none'",
      "frame-src https://www.google.com https://maps.google.com https://www.google.com/maps https://www.youtube-nocookie.com https://www.youtube.com",
      "script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com https://cdn.jsdelivr.net",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net",
      "connect-src 'self' https://cloudflareinsights.com https://cdn.jsdelivr.net https://fonts.googleapis.com wss:",
      "font-src 'self' data: https://fonts.gstatic.com",
      "manifest-src 'self'",
    ].join("; "),
  );

  return headers;
}
