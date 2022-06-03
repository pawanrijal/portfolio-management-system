module.exports = (sequelize, type) => {
  return sequelize.define(
    "stocks",
    {
      id: {
        type: type.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
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
    },
    {
      timestamps: true,
    }
  );
};
