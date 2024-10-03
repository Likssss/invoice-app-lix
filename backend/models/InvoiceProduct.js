const {DataTypes} = require('sequelize');
const sequelize = require('../config/config');

// Create invoice_products Table
const InvoiceProduct = sequelize.define('invoice_product', {
    invoiceId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    productName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    productPicture: {
        type: DataTypes.STRING,
        allowNull: true
    },
    productionPrice: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    sellingPrice: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: true  // This is default; you can omit this line if you want the default behavior
});

module.exports = InvoiceProduct;
