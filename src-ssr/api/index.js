const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const dbPath = path.resolve(__dirname, 'db.json');

const api = express();
api.use(cors());
api.use(express.json());

api.get('/state', (req, res) => {
  if (fs.existsSync(dbPath)) {
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
    res.json(db);
  } else {
    const defaultState = { text: 'Hello from DB!', toggle: false };
    fs.writeFileSync(dbPath, JSON.stringify(defaultState, null, 2));
    res.json(defaultState);
  }
});

api.post('/state', (req, res) => {
  const { text, toggle } = req.body;
  fs.writeFileSync(dbPath, JSON.stringify({ text, toggle }, null, 2));
  res.sendStatus(200);
});

module.exports = api;
