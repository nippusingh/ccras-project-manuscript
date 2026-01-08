
const express = require('express');
const router = express.Router();
const manuscriptController = require('../controllers/manuscript.controller');
const authMiddleware = require('../middleware/auth');
const roleMiddleware = require('../middleware/roles');

router.get('/', authMiddleware, manuscriptController.getAllManuscripts);
router.post('/', authMiddleware, roleMiddleware(['Principal Investigator']), manuscriptController.createManuscript);
router.patch('/:id/status', authMiddleware, manuscriptController.updateStatus);

module.exports = router;
