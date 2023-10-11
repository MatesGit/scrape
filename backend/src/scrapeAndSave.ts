import axios from 'axios';
import { db } from './db';

export const processData = async () => {
  try {
    await db.connect()
    await createTable()
    const data = await scrapeData()
    await insertData(data)
  } catch (err) {
    console.error('Error in data processing: ', err)
  }
}

const createTable = async () => {
  try {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS flats (
      id SERIAL PRIMARY KEY,
      name TEXT,
      image TEXT
    )
  `
  await db.query(createTableQuery)
  } catch (err) {
    console.error('Error in creating table: ', err)
  }
}

const scrapeData = async () => {
  try {
    const response = await axios.get('https://www.sreality.cz/api/cs/v2/estates?category_main_cb=1&category_type_cb=1&page=0&per_page=500')
    const originalData = await response.data._embedded.estates
    const extractedData = []

    originalData.forEach((record) => {
      const extractedRecord = {
        name: record.name,
        image: record._links.images[0].href
      }

      extractedData.push(extractedRecord)
    });
    return extractedData
  } catch (err) {
    console.error(err)
    throw err
  }
}

interface DataRecord {
  name: string;
  image: string;
}
interface InsertDataFunction {
  (data: DataRecord[]): Promise<void>;
}

const insertData: InsertDataFunction = async (data) => {
  try {
    for (const record of data) {
      const { name, image } = record

      const query = 'INSERT INTO flats(name, image) VALUES ($1, $2)'
      const values = [name, image]
      await db.query(query, values)
    }
  } catch (err) {
    console.error('Error: ', err)
  }
}