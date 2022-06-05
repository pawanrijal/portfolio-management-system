module.exports = (sequelize, type) => {
  return sequelize.define(
    "stockslist",
    {
      id: {
        type: type.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      stockName: {
        type: type.STRING,
        required: true,
        allowNull: false,
      },
      //0 for buy and  1 for sell
      type: {
        type: type.INTEGER,
        required: true,
        allowNull: false,
      },
      quantity: {
        type: type.INTEGER,
        required: true,
        allowNull: false,
      },
      price: {
        type: type.FLOAT,
        required: true,
        allowNull: false,
      },
      transactionDate: {
        type: type.DATE,
        required: true,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
};
