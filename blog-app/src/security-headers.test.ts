import { describe, expect, it } from 'vitest';
import { getSecurityHeaders } from '../../src/lib/headers';

describe('site security headers', () => {
  it('allows the approved Google Fonts stylesheet preload without broadening other origins', () => {
    const policy = getSecurityHeaders('/').get('content-security-policy');
    expect(policy).toContain("style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net");
    expect(policy).toContain("connect-src 'self' https://cloudflareinsights.com https://cdn.jsdelivr.net https://fonts.googleapis.com wss:");
  });
});
