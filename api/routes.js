const express = require('express');
const pool = require('./db');

const router = express.Router();

// Endpoint untuk ambil semua membership
router.get('/memberships', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM memberships');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Endpoint untuk tambah membership
router.post('/memberships', async (req, res) => {
  const { name, member_key, membership_status, apps } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO memberships (name, member_key, membership_status, apps) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, member_key, membership_status, apps]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /memberships/:member_key
router.get('/memberships/:member_key', async (req, res) => {
  const { member_key } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM memberships WHERE member_key = $1',
      [member_key]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Membership not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// POST /memberships
router.post('/memberships/by-key', async (req, res) => {
  const { member_key } = req.body;

  if (!member_key) {
    return res.status(400).json({ error: 'member_key is required' });
  }

  try {
    const result = await pool.query(
      'SELECT * FROM memberships WHERE member_key = $1',
      [member_key]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Membership not found' });
    }

    return res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;