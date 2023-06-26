const Sequelize = require("sequelize");
const sequelize = require("../configs/db.connection");


const master_catagories = sequelize.define("master_catagories", {
    title: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: 'blog title',
    },
    slug: {
        type: Sequelize.STRING(50),
        allowNull: true,
        comment: 'blog title',
    },
    logo: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: 'blog title',
    },
    small_description: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: 'blog title',
    },
    status: {
        type: Sequelize.ENUM("Yes", "No"),
        allowNull: true,
        defaultValue: "Yes",
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


module.exports = master_catagories;
