const stockListRouter = require("express").Router();
const StockListController = require("../controllers/stockListController");

stockListRouter.post("/stockList", StockListController.create);
stockListRouter.get("/stockList", StockListController.findAll);
stockListRouter.get("/stockList/:id", StockListController.findById);
stockListRouter.delete("/stockList/:id", StockListController.delete);
stockListRouter.put("/stockList/:id", StockListController.update); //update by id

module.exports = { stockListRouter };
