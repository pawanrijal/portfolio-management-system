module.exports = (sequelize, type) => {
  return sequelize.define(
    "users",
    {
      id: {
        type: type.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: type.STRING,
        unique: true,
        required: true,
      },
      email: {
        type: type.STRING,
        unique: true,
        allowNull: false,
        required: true,
      },
      password: {
        type: type.STRING,
        allowNull: false,
        required: true,
      },
      phone: {
        type: type.STRING,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );
};
