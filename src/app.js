import cookieParser from 'cookie-parser'
import express from 'express'
import authRoutes from './module/auth/auth.routes.js'
import ownerRoutes from './module/ipl-ms/routes/owner.routes.js'
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api/auth', authRoutes)

app.use('api/owner',ownerRoutes)


export default app