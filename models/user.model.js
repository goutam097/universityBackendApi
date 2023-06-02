const Sequelize = require("sequelize");
const sequelize = require("../configs/db.connection");

const User = sequelize.define("user", {
  name: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  mobile: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  otp: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  confirmPassword: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  isVerified: {
    type: Sequelize.ENUM("yes", "no"),
    allowNull: false,
    defaultValue: "no",
  },
  role: {
    type: Sequelize.ENUM("user", "admin", "staff"),
    allowNull: false,
    defaultValue: "user",
  },
  status: {
    type: Sequelize.ENUM("active", "inactive", "archive"),
    allowNull: false,
    defaultValue: "active",
  },
  createdBy: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  updatedBy: {
    type: Sequelize.STRING,
    allowNull: true,
  },  
});

module.exports = User;
