import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import generateRouter from './routes/generate.js'

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json({ limit: '500kb' }))

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'StorySpark AI Backend',
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim() !== ''),
    serverTime: new Date().toISOString(),
  })
})

// Story Generation Route
app.use('/api', generateRouter)

// 404 Handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found.' })
})

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Server Error]:', err?.message || err)
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error.',
  })
})

app.listen(PORT, () => {
  console.log(`🚀 [StorySpark AI Server] Running on http://localhost:${PORT}`)
  console.log(`🔑 [Gemini Key Status]: ${process.env.GEMINI_API_KEY ? 'Configured ✅' : 'Pending in server/.env ⚠️'}`)
})
