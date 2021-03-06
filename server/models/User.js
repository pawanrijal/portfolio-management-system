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
      //0 for user 1 for admin
      roleId: {
        type: type.INTEGER,
        required: true,
        default: 0,
      },
    },
    {
      timestamps: true,
    }
  );
};
