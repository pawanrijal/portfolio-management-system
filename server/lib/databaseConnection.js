const { Sequelize } = require("sequelize");
const User = require("../models/User");
const Stock = require("../models/Stock");
//DB SETTINGS
const DB_Name = process.env.DB_Name;
const DB_username = process.env.DB_Username;
const DB_password = process.env.DB_Password;
const DB_port = process.env.DB_PORT;
const db = {};

const sequelize = new Sequelize(DB_Name, DB_username, DB_password, {
  host: process.env.DB_Host,
  dialect: process.env.DB_Dialect,
  port: DB_port,
  pool: {
    max: 20,
    idle: 30000,
    min: 5,
  },
  define: {
    underscored: true,
  },
});

const UserModel = User(sequelize, Sequelize.DataTypes);
const StockMOdel = Stock(sequelize, Sequelize.DataTypes);

//association
StockMOdel.belongsTo(UserModel);
UserModel.hasMany(StockMOdel);

db.user = UserModel;
db.stock = StockMOdel;
db.sequelize = sequelize;
module.exports = db;
