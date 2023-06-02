const Sequelize = require("sequelize");
const sequelize = require("../configs/db.connection");


const todo = sequelize.define("todo", {
    title: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: 'todo title',
    },
    description: {
        type: Sequelize.TEXT(),
        allowNull: true,
        comment: 'todo description',
    },
});


module.exports = todo;
