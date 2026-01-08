
const db = require('../db');

exports.createManuscript = async (req, res) => {
  const { title, abstract, authors } = req.body;
  const creatorId = req.userData.userId;
  try {
    const result = await db.query(
      'INSERT INTO manuscripts (title, abstract, authors, creator_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, abstract, JSON.stringify(authors), creatorId]
    );
    
    // Log history
    await db.query(
      'INSERT INTO workflow_history (manuscript_id, status, note, actor_id) VALUES ($1, $2, $3, $4)',
      [result.rows[0].id, 'Draft', 'Manuscript draft created by author', creatorId]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.getAllManuscripts = async (req, res) => {
  try {
    const { userId, role } = req.userData;
    let query;
    let params = [];

    if (role === 'Principal Investigator') {
      query = 'SELECT * FROM manuscripts WHERE creator_id = $1 ORDER BY last_updated DESC';
      params = [userId];
    } else {
      query = 'SELECT * FROM manuscripts ORDER BY last_updated DESC';
    }

    const result = await db.query(query, params);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { newStatus, note } = req.body;
  const actorId = req.userData.userId;
  try {
    await db.query('BEGIN');
    
    const result = await db.query(
      'UPDATE manuscripts SET status = $1, last_updated = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [newStatus, id]
    );

    await db.query(
      'INSERT INTO workflow_history (manuscript_id, status, note, actor_id) VALUES ($1, $2, $3, $4)',
      [id, newStatus, note, actorId]
    );

    await db.query('COMMIT');
    res.status(200).json(result.rows[0]);
  } catch (err) {
    await db.query('ROLLBACK');
    res.status(500).json({ error: err.message });
  }
};
