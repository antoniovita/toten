const express = require('express');
const {createProduct, getAllProducts, deleteProduct, updateProduct, getProductById} = require('../controllers/productController');

const router = express.Router();

router.post('/', createProduct);
router.get('/', getAllProducts);
router.delete('/:id', deleteProduct);
router.put('/:id', updateProduct);
router.get('/:id', getProductById);

module.exports = router;