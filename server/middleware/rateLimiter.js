import rateLimit from 'express-rate-limit'

/**
 * Basic rate limiting middleware to prevent spam, abuse, and accidental quota exhaustion.
 * Allows up to 25 story generation requests per 15-minute window per IP.
 */
export const generationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 25, // limit each IP to 25 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Generation limit reached. To maintain quality and prevent abuse, please wait 15 minutes before creating more stories.',
    code: 'RATE_LIMIT_EXCEEDED',
  },
})

export default generationLimiter
