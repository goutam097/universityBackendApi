const Sequelize = require("sequelize");
const sequelize = require("../configs/db.connection");
const Master_catagoryModel = require("../models/master_catagory.model");



const gallery = sequelize.define("galleries", {
    catagory_slug: {
        type: Sequelize.INTEGER(50),
        allowNull: true,
      },
    slug: {
        type: Sequelize.STRING(50),
        allowNull: true,
        comment: 'blog title',
    },
    image: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: 'blog title',
    },
    status: {
        type: Sequelize.ENUM("Yes", "No"),
        allowNull: true,
        defaultValue: "No",
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
    },
});
Master_catagoryModel.hasMany(gallery, {
    foreignKey: "catagory_slug",
    onDelete: "cascade",
  });


module.exports = gallery;
