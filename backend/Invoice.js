const {DataTypes} = require('sequelize')
const sequelize = require('./config/config')

// Create invoice Table
const Invoice = sequelize.define('invoice', {
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    customerName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    salespersonName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    timestamps: true  // This is default; you can omit this line if you want the default behavior
})

module.exports = Invoice