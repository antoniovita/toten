const express = require('express');
const {createProduct, getAllProducts, deleteProduct, updateProduct, getProductById} = require('../controllers/productController');
const authenticateToken = require('../middlewares/auth');
const router = express.Router();

router.post('/', authenticateToken, createProduct);
router.get('/', getAllProducts);
router.delete('/:id',  authenticateToken, deleteProduct);
router.put('/:id',  authenticateToken, updateProduct);
router.get('/:id', getProductById);

module.exports = router;