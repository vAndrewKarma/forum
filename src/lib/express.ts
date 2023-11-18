import express from 'express'
import helmet from 'helmet'

export default async function ExpressInit() {
  const app = express()
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.set('port', 3000)
  app.use((req, res, next) => {
    // allow different IP address
    res.setHeader('Access-Control-Allow-Origin', '*')
    // allow different header field
    res.header('Access-Control-Allow-Headers', '*')
    res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, OPTIONS')

    next()
  })

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'"],
        },
      },
      hidePoweredBy: true,
      hsts: {
        maxAge: 31536000, // 1 year
        includeSubDomains: true,
        preload: true,
      },
      frameguard: {
        action: 'deny',
      },
      xssFilter: true,
      noSniff: true,
    })
  )
  app.get('/', (req, res, next) => {
    res.send('hello.')
  })
  return app
}
