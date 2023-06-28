const Sequelize = require('sequelize');
// save server configuration in sequelize variable and import it into files of module
const sequelize = new Sequelize('heroku_768a282eef63951', 'b58c5485c309e1', 'a2b9ba1a', {
    dialect: 'mysql',
    host: 'eu-cdbr-west-03.cleardb.net'
});

module.exports = sequelize;