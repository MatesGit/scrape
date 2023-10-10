import { Pool } from "pg"

export const db = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '18231823',
  port: 5432,
})