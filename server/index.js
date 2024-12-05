const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

const db = new sqlite3.Database('./adagency.db', (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  }
  console.log('Connected to the SQLite database.');
});

// Create
app.post('/api/campaigns', (req, res) => {
  const { campaign_name, budget, client } = req.body;
  db.run('INSERT INTO campaigns (campaign_name, budget, client) VALUES (?, ?, ?)', [campaign_name, budget, client], function(err) {
    if (err) {
      res.status(400).json({"error": err.message});
      return;
    }
    res.json({
      "message": "success",
      "data": { id: this.lastID, campaign_name, budget, client }
    });
  });
});

// Read
app.get('/api/campaigns', (req, res) => {
  db.all("SELECT * FROM campaigns", [], (err, rows) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.json({
      "message":"success",
      "data":rows
    });
  });
});

// Update
app.put('/api/campaigns/:id', (req, res) => {
  const { campaign_name, budget, client } = req.body;
  db.run(
    `UPDATE campaigns SET 
      campaign_name = COALESCE(?,campaign_name), 
      budget = COALESCE(?,budget), 
      client = COALESCE(?,client) 
    WHERE id = ?`,
    [campaign_name, budget, client, req.params.id],
    function(err) {
      if (err) {
        res.status(400).json({"error": err.message});
        return;
      }
      res.json({
        message: "success",
        data: { id: req.params.id, campaign_name, budget, client },
        changes: this.changes
      });
    }
  );
});

// Delete
app.delete('/api/campaigns/:id', (req, res) => {
  db.run(
    'DELETE FROM campaigns WHERE id = ?',
    req.params.id,
    function(err) {
      if (err) {
        res.status(400).json({"error": err.message});
        return;
      }
      res.json({"message":"deleted", changes: this.changes});
    }
  );
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});