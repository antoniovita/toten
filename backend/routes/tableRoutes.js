const express = require('express');
const router = express.Router();
const {getTableByNumber, createTable, deleteTable} = require('../controllers/tableController');

router.get('/:number', getTableByNumber);
router.post('/', createTable);
router.delete('/:number', deleteTable);

module.exports = router;