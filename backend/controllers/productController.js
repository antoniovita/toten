const { Product } = require("../models");

const createProduct = async (req, res) => {
  try {
    const { name, description, price, image_url } = req.body;
    const user_id = req.params.user_id;
    const product = await Product.create({ name, description, price, image_url, user_id });
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar produto" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const products = await Product.findAll({ where: { user_id } });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar produtos" });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.params.user_id;
    const product = await Product.findOne({ where: { id, user_id } });
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Produto não encontrado" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar produto" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, image_url } = req.body;
    const user_id = req.params.user_id;
    const product = await Product.findOne({ where: { id, user_id } });
    if (!product) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }
    await product.update({ name, description, price, image_url });
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar produto" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.params.user_id;
    const product = await Product.findOne({ where: { id, user_id } });
    if (!product) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }
    await product.destroy();
    res.json({ message: "Produto deletado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao deletar produto" });
  }
};

module.exports = { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct };