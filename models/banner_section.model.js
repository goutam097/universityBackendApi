const Sequelize = require("sequelize");
const sequelize = require("../configs/db.connection");


const banner = sequelize.define("banners", {
    title: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: 'banner title',
    },
    heading: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: 'banner heading',
    },
    small_description: {
        type: Sequelize.TEXT(),
        allowNull: true,
        comment: 'banner small_description',
    },

    long_description: {
        type: Sequelize.TEXT(),
        allowNull: true,
        comment: 'banner long_description',
    },
    image: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: 'banner image',
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


module.exports = banner;
