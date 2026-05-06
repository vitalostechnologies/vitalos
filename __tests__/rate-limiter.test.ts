import { describe, it, expect, beforeEach, vi } from 'vitest'

// Inline the rate limiter logic for isolated testing
// This mirrors the logic in app/api/contact/route.ts

function makeRateLimiter(maxPerHour: number) {
  const map = new Map<string, { count: number; resetAt: number }>()

  return function check(ip: string, now: number = Date.now()): boolean {
    const entry = map.get(ip)

    if (!entry || now > entry.resetAt) {
      map.set(ip, { count: 1, resetAt: now + 3_600_000 })
      return true
    }

    if (entry.count >= maxPerHour) return false

    entry.count += 1
    return true
  }
}

describe('Rate limiter', () => {
  let check: ReturnType<typeof makeRateLimiter>
  const BASE = 1_000_000_000 // fixed "now" for determinism
  const IP = '203.0.113.1'

  beforeEach(() => {
    check = makeRateLimiter(3)
  })

  it('allows the first request', () => {
    expect(check(IP, BASE)).toBe(true)
  })

  it('allows up to the limit', () => {
    expect(check(IP, BASE)).toBe(true)
    expect(check(IP, BASE)).toBe(true)
    expect(check(IP, BASE)).toBe(true)
  })

  it('blocks the 4th request within the window', () => {
    check(IP, BASE)
    check(IP, BASE)
    check(IP, BASE)
    expect(check(IP, BASE)).toBe(false)
  })

  it('resets after an hour has elapsed', () => {
    check(IP, BASE)
    check(IP, BASE)
    check(IP, BASE)
    // still blocked at window end
    expect(check(IP, BASE + 3_599_999)).toBe(false)
    // allowed once window resets
    expect(check(IP, BASE + 3_600_001)).toBe(true)
  })

  it('tracks different IPs independently', () => {
    const IP2 = '198.51.100.5'
    check(IP, BASE)
    check(IP, BASE)
    check(IP, BASE)
    expect(check(IP, BASE)).toBe(false)
    // second IP is unaffected
    expect(check(IP2, BASE)).toBe(true)
  })
})
