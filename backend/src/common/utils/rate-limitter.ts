import rate_limiter from 'express-rate-limit'

const limiter = rate_limiter({
  /* i recommend use HAProxy or a reverse proxy to limit http requests instead of using express... 
 rate limit should not be in the business logic
  */
  windowMs: 1 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
})

export default limiter
