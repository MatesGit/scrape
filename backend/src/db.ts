import { Client, Pool } from "pg"

export const db = new Client({
  host: 'postgres',
  database: 'postgres',
  user: 'postgres',
  password: 'postgres',
  port: 5432,
})