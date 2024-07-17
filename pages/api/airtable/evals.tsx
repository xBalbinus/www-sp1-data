import Airtable from 'airtable';

import * as Server from 'common/middleware';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

export default async function apiAirtableEvals(req, res) {
  await Server.cors(req, res);
  const tableId = process.env.EVALS_TABLE_ID;

  try {
    const base = new Airtable({ apiKey: process.env.EVALS_TOKEN }).base(process.env.EVALS_BASE_ID!);
    const records = await base(tableId!).select().all();

    res.json({ records });
  } catch (e) {
    console.log('Error fetching from airtable:', e);
    res.json({ error: true });
  }
}