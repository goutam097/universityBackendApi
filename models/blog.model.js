const Sequelize = require("sequelize");
const sequelize = require("../configs/db.connection");


const blog = sequelize.define("blog", {
    title: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: 'blog title',
    },
    description: {
        type: Sequelize.TEXT(),
        allowNull: true,
        comment: 'blog description',
    },
    image: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: 'blog image',
    },
});


module.exports = blog;
