const { Table } = require('../models');

const getTableByNumber = async (req, res) => {
  const { number } = req.params;
  try {
    const table = await Table.findOne({ where: { number } });
    if (table) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    console.error('Erro ao verificar número da mesa', error);
    res.status(500).json({ error: 'Erro ao verificar número da mesa' });
  }
};

const createTable = async (req, res) => {
  const { number } = req.body;
  try {
    const table = await Table.create({ number });
    res.status(201).json(table);
  } catch (error) {
    console.error('Erro ao criar mesa', error);
    res.status(500).json({ error: 'Erro ao criar mesa' });
  }
};

const deleteTable = async (req, res) => {
  const { number } = req.params;
  try {
    const table = await Table.findOne({ where: { number } });
    if (table) {
      await table.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Mesa não encontrada' });
    }
  } catch (error) {
    console.error('Erro ao deletar mesa', error);
    res.status(500).json({ error: 'Erro ao deletar mesa' });
  }
};

module.exports = { getTableByNumber, createTable, deleteTable };