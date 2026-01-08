
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const roleMiddleware = require('../middleware/roles');

router.post('/:id/process', authMiddleware, roleMiddleware(['RPIC Member', 'PG-CCRAS']), (req, res) => {
  res.json({ message: 'APC Processing initiated' });
});

module.exports = router;
