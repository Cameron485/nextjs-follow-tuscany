import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
import { config } from 'dotenv'

config({ path: '.env' }) // or .env.local

const sql = neon(process.env.DATABASE_URL!)
import * as schema from './schema'

export const db = drizzle(sql, { schema })
