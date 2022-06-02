const express = require("express");

const app = express();

require("dotenv").config();
const PORT = process.env.PORT;

const { sequelize } = require("./lib/databaseConnection");

//sequelize authentication to database
sequelize
  .authenticate()
  .then(() => {
    // sequelize.sync({ alter: true });
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log(err.message);
  });

//Test
app.get("/test", (req, res) => {
  res.send({ message: "Test Successful" });
});

app.listen(PORT, () => {
  console.log(`Listening to the server on ${PORT}`);
});
