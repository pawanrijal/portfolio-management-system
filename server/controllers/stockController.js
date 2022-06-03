const StockSevice = require("../service/stockSevice");
const successResponse = require("../utils/successResponse");

class StockController {
  async create(req, res, next) {
    try {
      let data = await StockSevice.create(req.body);
      successResponse(res, 400, data, "Stock Created");
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;

      const menuData = await StockSevice.update(req.body, id);
      successResponse(res, 200, menuData, "Stock updated");
    } catch (err) {
      next(err);
    }
  }

  async findAll(req, res, next) {
    try {
      const menuData = await StockSevice.findAll();
      successResponse(res, 200, menuData, "Stock fetched");
    } catch (err) {
      next(err);
    }
  }

  async findById(req, res, next) {
    const id = req.params.id;
    try {
      const menuData = await StockSevice.findById(id);
      successResponse(res, 200, menuData, "Stock fetched");
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    const id = req.params.id;
    try {
      let menuData = await StockSevice.delete(id);
      successResponse(res, 200, menuData, "Stock Deleted");
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new StockController();
