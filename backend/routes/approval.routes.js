
const express = require('express');
const router = express.Router();
const approvalController = require('../controllers/approval.controller');
const authMiddleware = require('../middleware/auth');

router.post('/:id/request', authMiddleware, approvalController.requestApproval);

module.exports = router;
