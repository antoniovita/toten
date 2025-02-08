const express = require("express");
const { sequelize } = require("./models");

const app = express();

app.use(express.json());

const testConnection = async () => {
    try {
      await sequelize.authenticate();
      console.log("Connected to the database.");
    } catch (error) {
      console.error("Error connecting to the database.", error);
    }
  }
testConnection();

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
