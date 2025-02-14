const { Table } = require("../models");

const createTable = async (req, res) => {
  try {
    const { number } = req.body;
    const user_id = req.params.user_id;
    const table = await Table.create({ number, user_id });
    res.status(201).json(table);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar mesa" });
  }
};

const getTableByNumber = async (req, res) => {
  try {
    const { number } = req.params;
    const user_id = req.params.user_id;
    const table = await Table.findOne({ where: { number, user_id } });
    if (table) {
      res.json(table);
    } else {
      res.status(404).json({ error: "Mesa não encontrada" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar mesa" });
  }
};

const deleteTable = async (req, res) => {
  try {
    const { number } = req.params;
    const user_id = req.params.user_id;
    const table = await Table.findOne({ where: { number, user_id } });
    if (!table) {
      return res.status(404).json({ error: "Mesa não encontrada" });
    }
    await table.destroy();
    res.json({ message: "Mesa deletada com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao deletar mesa" });
  }
};

module.exports = { createTable, getTableByNumber, deleteTable };