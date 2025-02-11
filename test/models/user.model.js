const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/dbConfig");

const UserTable = sequelize.define(
  "usertable",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 255],
        // Removed isAlphanumeric to allow special characters for stronger passwords
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
      },
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          const hashedPassword = await bcrypt.hash(user.password, 10);
          user.password = hashedPassword;
        }
      },
    },
    tableName: "usertable",
  }
);

UserTable.prototype.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    console.error("Error comparing password:", error);
    return false;
  }
};

module.exports = UserTable;
