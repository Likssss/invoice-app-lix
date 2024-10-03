const Invoice = require('../Invoice')
const InvoiceProduct = require('./InvoiceProduct')

// Define tables relationship
Invoice.hasMany(InvoiceProduct, {foreignKey: 'invoiceId'})
InvoiceProduct.belongsTo(Invoice, {foreignKey: 'invoiceId'})

module.exports = {Invoice, InvoiceProduct}