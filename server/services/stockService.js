const { stock } = require("../lib/databaseConnection");

const {
  alreadyExistsException,
} = require("../exceptions/alreadyExistsException");
const { notFoundException } = require("../exceptions/notFoundException");

class StockService {
  async create(payload) {
    let stockData = await stock.findOne({
      where: { name: payload.name },
    });
    //check stock already exist
    if (stockData === null) {
      let data = await stock.create(payload);
      return data;
    } else {
      throw new alreadyExistsException("Stock");
    }
  }

  async update(payload, id) {
    const returnData = await stock.update(payload, {
      where: { id },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    return returnData;
  }

  async findAll() {
    const returnData = await stock.findAll({
      exclude: ["createdAt", "updatedAt"],
    });
    return returnData;
  }

  async findById(id) {
    const returnData = await stock.findOne({
      where: { id },
      include: product,
      exclude: ["createdAt", "updatedAt"],
    });
    if (returnData === null) {
      throw new notFoundException("stock");
    }
    return returnData;
  }
  async delete(id) {
    {
      const returnData = await stock.destroy({ where: { id } });
      return returnData;
    }
  }
}

module.exports = new StockService();
