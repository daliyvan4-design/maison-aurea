import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'

// Connexion paresseuse — ne lève pas d'erreur au build si DATABASE_URL est absent.
// Les pages admin gèrent le cas manquant avec try/catch.
function getDb() {
  const url = process.env.DATABASE_URL
  if (!url) throw new Error('DATABASE_URL non défini — ajouter dans .env.local ou Vercel env vars')
  return drizzle(neon(url), { schema })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const db = new Proxy({} as ReturnType<typeof getDb>, {
  get(_target, prop) {
    const instance = getDb()
    return (instance as unknown as Record<string | symbol, unknown>)[prop]
  },
})
