// declare Sequelize from package.json
const Sequelize = require('sequelize');
// declare Sequelize details from util folder 
const sequelize = require('../util/database')
// create User variable to define the user for registration
const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    org_name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING
})
// create LoginUser variable to define users to login the admin
const LoginUser = sequelize.define('users', {
    org_name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING
})
// exports them
module.exports = {
    User,
    LoginUser,
};