const { stock } = require("../lib/databaseConnection");

const {
  alreadyExistsException,
} = require("../exceptions/alreadyExistsException");
const { notFoundException } = require("../exceptions/notFoundException");

class stockService {
  async create(payload) {
    let stockData = await stock.findOne({
      where: { shortName: payload.shortName },
    });
    //check stock already exist
    if (stockData === null) {
      let data = await stock.create(payload);
      return data;
    } else {
      throw new alreadyExistsException("stock");
    }
  }

  async update(payload, id) {
    await this.findById(id);

    const returnData = await stock.update(payload, {
      where: { id },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    return returnData;
  }

  async findAll() {
    const returnData = await stock.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    return returnData;
  }

  async findById(id) {
    const returnData = await stock.findOne({
      where: { id },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    if (returnData === null) {
      throw new notFoundException("stock");
    }
    return returnData;
  }

  async delete(id) {
    {
      await this.findById(id);
      const returnData = await stock.destroy({ where: { id } });
      return returnData;
    }
  }
}

module.exports = new stockService();
