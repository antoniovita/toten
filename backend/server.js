const express = require('express');
const cors = require('cors');
const {sequelize} = require('./models');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const orderItemRoutes = require('./routes/orderItemRoutes');
const tableRoutes = require('./routes/tableRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/orderItems', orderItemRoutes);
app.use('/tables', tableRoutes);

sequelize.authenticate().then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
}).catch((error) => {
    console.error('Erro ao conectar com o banco de dados:', error);
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});