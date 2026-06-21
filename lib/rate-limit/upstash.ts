/**
 * Upstash Rate Limiting Utility
 * 
 * Per Security Guidelines §4.2: Edge rate limiting via Upstash Redis.
 * Per API Contracts §7: Rate limit check before email dispatch.
 * Per System Architecture §7: Rate limiting is a cross-cutting concern.
 */

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

/**
 * Rate limiter instance using Upstash Redis
 * 
 * Limits: 3 submissions per IP per hour (configurable via environment)
 * 
 * Environment variables required:
 * - UPSTASH_REDIS_REST_URL: Upstash Redis REST API URL
 * - UPSTASH_REDIS_REST_TOKEN: Upstash Redis REST API token
 */
let ratelimit: Ratelimit | null = null;

function getRateLimiter(): Ratelimit | null {
  if (ratelimit) {
    return ratelimit;
  }

  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!redisUrl || !redisToken) {
    console.warn('⚠️  Upstash Redis not configured - rate limiting disabled');
    return null;
  }

  try {
    const redis = new Redis({
      url: redisUrl,
      token: redisToken,
    });

    ratelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(3, '1h'), // 3 requests per hour
      analytics: true,
      prefix: '@portfolio/contact',
    });

    return ratelimit;
  } catch (error) {
    console.error('❌ Failed to initialize Upstash rate limiter:', error);
    return null;
  }
}

/**
 * Check if a request is rate limited
 * 
 * @param identifier - Unique identifier for the rate limit (typically IP address)
 * @returns Object with success status and remaining count
 * 
 * Example usage:
 * ```ts
 * const result = await checkRateLimit('192.168.1.1');
 * if (!result.success) {
 *   return { success: false, error: { code: 'RATE_LIMITED' } };
 * }
 * ```
 */
export async function checkRateLimit(identifier: string): Promise<{
  success: boolean;
  remaining: number;
  reset?: Date;
}> {
  const limiter = getRateLimiter();

  if (!limiter) {
    // If rate limiter is not configured, allow all requests
    // This is a graceful fallback, not a security bypass
    console.warn('⚠️  Rate limiting disabled - allowing request');
    return { success: true, remaining: 999 };
  }

  try {
    const result = await limiter.limit(identifier);
    
    if (!result.success) {
      console.log(`⚠️  Rate limit exceeded for ${identifier}`);
    }

    return {
      success: result.success,
      remaining: result.remaining,
      reset: result.reset ? new Date(result.reset) : undefined,
    };
  } catch (error) {
    console.error('❌ Rate limit check failed:', error);
    // On error, allow request to avoid blocking legitimate users
    return { success: true, remaining: 999 };
  }
}
