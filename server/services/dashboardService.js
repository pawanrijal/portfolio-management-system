const { sequelize } = require("../lib/databaseConnection");

const userService = require("./userService");
const { QueryTypes } = require("sequelize");

class DashboardService {
  async dashboard(id) {
    const _user = await userService.profile(id); //userdata
    let stockName = [];
    const returnData = []; //for returning
    _user.stockslists.forEach((element) => stockName.push(element.stockName)); //adding stock name in array

    //filter only unique values
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }

    let uniqueNames = stockName.filter(onlyUnique); //unique name
    let buyUnits = [];
    let prices = [];
    let soldPrice = [];
    let totalInvestMent = [];
    let soldUnits = [];
    let profit = [];

    for (let i = 0; i < uniqueNames.length; i++) {
      let buyUnit = await sequelize.query(
        `SELECT SUM (quantity) AS buy
FROM stockslists
WHERE (user_id=${id} AND stock_name='${uniqueNames[i]}' AND type=0)`,
        { type: QueryTypes.SELECT }
      ); //buy retrieve

      let totalPrice = await sequelize.query(
        `SELECT SUM (price) AS price
FROM stockslists
WHERE (user_id=${id} AND stock_name='${uniqueNames[i]}' and type=0)`,
        { type: QueryTypes.SELECT } //investment
      );

      let soldAmount = await sequelize.query(
        `SELECT SUM (price) AS sold
FROM stockslists
WHERE (user_id=${id} AND stock_name='${uniqueNames[i]}' and type=1)`,
        { type: QueryTypes.SELECT } //sold amount
      );
      let soldUnit = await sequelize.query(
        `SELECT SUM (quantity) AS soldUnits
FROM stockslists
WHERE (user_id=${id} AND stock_name='${uniqueNames[i]}' and type=1)`,
        { type: QueryTypes.SELECT } //sold unit
      );

      let { soldunits } = soldUnit[0];

      let { buy } = buyUnit[0];

      let { price } = totalPrice[0]; //buy
      let { sold } = soldAmount[0]; //sell
      soldUnits.push(soldunits);
      console.log(price);

      var soldnum = parseInt(soldunits);
      soldPrice.push(soldnum * sold);
      console.log(soldPrice);

      prices.push(totalPrice);
      buyUnits.push(buy);
      totalInvestMent.push(buy * price);

      profit.push(soldunits * sold - buy * price);

      returnData.push({
        name: uniqueNames[i],
        buyUnits: buyUnits[i],
        soldAmount: soldPrice[i],
        totalInvestMent: totalInvestMent[i],
        profit: profit[i],
        id: i + 1,
      });
    }

    return returnData;
  }
}

module.exports = new DashboardService();
