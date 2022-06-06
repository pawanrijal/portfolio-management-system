const { stockList, stock } = require("../lib/databaseConnection");

const { notFoundException } = require("../exceptions/notFoundException");

class stockListService {
  async create(payload) {
    const { stockId } = await stock.findOne({
      where: { name: payload.stockName },
    });
    payload.stockId = stockId;
    let data = await stockList.create(payload);
    return data;
  }

  async update(payload, id) {
    await this.findById(id);

    const returnData = await stockList.update(payload, {
      where: { id },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    return returnData;
  }

  async findAll() {
    const returnData = await stockList.findAll({
      exclude: ["createdAt", "updatedAt"],
    });
    return returnData;
  }

  async findById(id) {
    const returnData = await stockList.findOne({
      where: { id },
      exclude: ["createdAt", "updatedAt"],
    });
    if (returnData === null) {
      throw new notFoundException("stockList");
    }
    return returnData;
  }
  async delete(id) {
    {
      await this.findById(id);
      const returnData = await stockList.destroy({ where: { id } });
      return returnData;
    }
  }
}

module.exports = new stockListService();
