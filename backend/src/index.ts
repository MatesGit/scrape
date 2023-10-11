import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { db } from './db'
import { processData } from './scrapeAndSave'

const app = express()
const port = 5000;

app.use(cors())
app.use(bodyParser.json())


processData()

app.get('/api/scrapedData/page/:pageNumber', async (req, res) => {
  try {
    const { pageNumber } = req.params;
    const pageSize = 20;

    const offset = (parseInt(pageNumber, 10) - 1) * pageSize;

    const data = await db.query('SELECT * FROM flats LIMIT $1 OFFSET $2', [pageSize, offset]);

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`Server runs at http://localhost:${port}`);
});

