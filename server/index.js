const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
require("dotenv").config();
const PORT = process.env.PORT;

const { sequelize } = require("./lib/databaseConnection");
const HttpException = require("./exceptions/HttpException");

const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { router } = require("./routes");
app.use(router);

//sequelize authentication to database
sequelize
  .authenticate()
  .then(() => {
    // sequelize.sync({ force: true });
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log(err.message);
  });

//Test
app.get("/test", (req, res) => {
  res.send({ message: "Test Successful" });
});

//if Routes Not Found
app.use((req, res, next) => {
  const err = new HttpException(404, "Route doesnot exist");

  next(err);
});

// Global error handler
app.use((err, req, res, next) => {
  err.success = false;
  err.status = err.status || 500;
  err.message = err.message || "Something went wrong";
  err.data = err.data || err.stack;

  res.status(err.status).json({
    success: err.success,
    status: err.status,
    message: err.message,
    data: err.data,
  });
});

app.listen(PORT, () => {
  console.log(`Listening to the server on ${PORT}`);
});
