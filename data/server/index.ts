import dotenv from 'dotenv'

// Load environment variables first, before any other imports
dotenv.config({ path: '.env' })
dotenv.config({ path: '../website/.env.local' })

import express from 'express'
import cors from 'cors'
import clientsRouter from './routes/clients.js'
import leadsRouter from './routes/leads.js'
import applicantsRouter from './routes/applicants.js'
import companiesRouter from './routes/companies.js'
import peopleRouter from './routes/people.js'
import versionsRouter from './routes/versions.js'
import enrichRouter from './routes/enrich.js'
import vendorsRouter from './routes/vendors.js'
import harvestRouter from './routes/harvest.js'
import invoicesRouter from './routes/invoices.js'

const app = express()
const PORT = 4001

app.use(cors())
app.use(express.json())

// API Routes
app.use('/api/clients', clientsRouter)
app.use('/api/leads', leadsRouter)
app.use('/api/applicants', applicantsRouter)
app.use('/api/companies', companiesRouter)
app.use('/api/people', peopleRouter)
app.use('/api/versions', versionsRouter)
app.use('/api/enrich', enrichRouter)
app.use('/api/vendors', vendorsRouter)
app.use('/api/harvest', harvestRouter)
app.use('/api/invoices', invoicesRouter)

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`🚀 Magnet Data API running on http://localhost:${PORT}`)
})

