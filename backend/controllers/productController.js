const { Product } = require("../models");

const createProduct = async (req, res) => {
try {
    const {name, description, price, image_url, category, available} = req.body;
    const product = await Product.create({name, description, price, image_url, category, available});
    res.status(201).json(product);
} catch(error) {
    res.status(500).json({error: "Erro ao criar produto", error})
}
};

const getAllProducts = async (req,res) => {
    try {
        const products = await Product.findAll();
        res.status(201).json(products);
    } catch (error) {
        res.status(500).json({error: "Erro ao buscar produtos", error});
    }
};

const deleteProduct = async (req,res) => {
    try {
        const {id} = req.params;
        await Product.destroy({where: {id}});
        req.json({message: "Produto deletado com sucesso" , error})
    } catch {
        res.status(500).json({error: "Erro ao deletar produto", error});
    }
};

const updateProduct = async (req,res) => {
    try{
        const {id} = req.params;
        const {name, description, price, image_url, category, available} = req.body;
        const product = await Product.update({name, description, price, image_url, category, available}, {where: {id}});
        res.json({message: "Produto atualizado com sucesso", product});
    } catch {
        res.status(500).json({error: "Erro ao atualizar produto", error});
    }
};
module.exports = { createProduct, getAllProducts, deleteProduct, updateProduct};