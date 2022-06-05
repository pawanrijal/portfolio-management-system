module.exports = (sequelize, type) => {
  return sequelize.define("stocks", {
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
    shortName: {
      type: type.STRING,
      required: true,
      allowNull: false,
      unique: true,
    },
    currentPrice: {
      type: type.FLOAT,
      required: true,
      allowNull: false,
    },
  });
};
