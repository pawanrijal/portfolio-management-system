const StockSevice = require("../service/stockSevice");
const successResponse = require("../utils/successResponse");

class StockController {
  async create(req, res, next) {
    try {
      let data = await StockSevice.create(req.body);
      successResponse(res, 400, data, "Menu Item Created");
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;

      const token = req.headers.authorization.split(" ")[1];
      const menuData = await StockSevice.update(req.body, id, token);
      successResponse(res, 200, menuData, "Menu Item updated");
    } catch (err) {
      next(err);
    }
  }

  async findAll(req, res, next) {
    try {
      const menuData = await StockSevice.findAll();
      successResponse(res, 200, menuData, "Menu Item fetched");
    } catch (err) {
      next(err);
    }
  }

  async findById(req, res, next) {
    const id = req.params.id;
    try {
      const menuData = await StockSevice.findById(id);
      successResponse(res, 200, menuData, "Menu Item fetched");
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    const id = req.params.id;
    try {
      let menuData = await StockSevice.delete(id, token);
      successResponse(res, 200, menuData, "Menu Item Deleted");
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new StockController();
