import rate_limiter from 'express-rate-limit'

const limiter = rate_limiter({
  /* i recommend use HAProxy or a reverse proxy to limit http requests instead of using express... 
 rate limit should not be in the business logic
  */
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20,
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

export default limiter
