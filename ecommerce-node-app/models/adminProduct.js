const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../util/database');
// Create new variable to define new table name of user table name
const NewTable = (orgName) => {
    const tableName = `${orgName}s`;
    const TableModel = sequelize.define(tableName,{
        product_name: {
            type: Sequelize.STRING,
                allowNull: false,
                    validate: {
                notNull: { args: true, msg: "You must enter a name" }
            },
        },
        product_description: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        product_price: {
            type: Sequelize.FLOAT,
            allowNull: false,
        },
        Image: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    return TableModel;
}

module.exports = { NewTable } 