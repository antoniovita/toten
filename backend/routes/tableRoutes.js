const express = require('express');
const { getTableByNumber, createTable, deleteTable } = require('../controllers/tableController');
const authenticateToken = require('../middlewares/auth');
const router = express.Router({ mergeParams: true });

router.get('/:number', getTableByNumber);
router.post('/', authenticateToken, createTable);
router.delete('/:number', authenticateToken, deleteTable);

module.exports = router;