// declare sequelize as Sequelize from package.json
const Sequelize = require('sequelize');
// import server data from util folder database
const sequelize = require('../util/database')
// Create new variable Client to define clients table in database for registration
const Client = sequelize.define('clients', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING
})
// Create new variable ClientLogin to define clients table in database for login client
const ClientLogin = sequelize.define('clients', {
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING
})

module.exports = {
    Client,
    ClientLogin
}