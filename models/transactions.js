const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Transaction extends Model {}

Transaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    date_due: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    user_id: {
      type: DataTypes.INTEGER,
      refrences: {
        model: "user",
        key: "id",
      },
    },
  },
  // categories_id: {
  //   type: DataTypes.INTEGER,
  //   references: {
  //     model: 'category',
  //     key: 'id',
  //   },
  // },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "transaction",
  }
);

module.exports = Transaction;
