const stockRouter = require("express").Router();
const StockController = require("../controllers/stockController");

stockRouter.post("/stock", StockController.create);
stockRouter.get("/stock", StockController.findAll);
stockRouter.get("/stock/:id", StockController.findById);
stockRouter.delete("/stock/:id", StockController.delete);
stockRouter.put("/stock/:id", StockController.update); //update by id

module.exports = { stockRouter };
