const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../util/database');
// Create new variable of CarTable to define new table name of client_carts
const CartTable = (clientCart) => {
    const tableName = `${clientCart}s`
    const TableModel = sequelize.define(tableName, {
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        product_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        one_product_price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        total_product_price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        product_qty: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Image: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
    return TableModel;
};

module.exports = { CartTable }