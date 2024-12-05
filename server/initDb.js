const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./adagency.db', (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  }
  console.log('Connected to the SQLite database.');
});

db.run(`CREATE TABLE IF NOT EXISTS campaigns (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  campaign_name TEXT,
  budget INTEGER,
  client TEXT
)`, (err) => {
  if (err) {
    console.log('Campaigns table creation error:', err);
  } else {
    console.log('Campaigns table created successfully.');

    const insert = 'INSERT INTO campaigns (campaign_name, budget, client) VALUES (?, ?, ?)';
    sampleCampaigns.forEach(campaign => {
      db.run(insert, campaign);
    });
  }
});

db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Closed the database connection.');
});

console.log('Database initialization completed.');