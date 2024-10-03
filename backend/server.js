const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import config
const sequelize = require('./config/config');
const { Invoice, InvoiceProduct } = require('./models/models');

// Express App config
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Syncing ORM with Database
sequelize.sync().then(() => {
    console.log('Database & tables created!');
});

// POST Invoice Route
app.post('/api/invoices', async (req, res) => {
    const { date, customerName, salespersonName, notes, products } = req.body;

    if (!date || !customerName || !salespersonName || !products.length) {
        return res.status(400).send('All mandatory fields must be filled');
    }

    try {
        const invoice = await Invoice.create({
            date,
            customerName,
            salespersonName,
            notes
        });

        const productPromises = products.map(product => {
            return InvoiceProduct.create({
                invoiceId: invoice.id,
                productName: product.productName,
                productPicture: product.productPicture,
                productionPrice: product.productionPrice,
                sellingPrice: product.sellingPrice,
                quantity: product.quantity
            });
        });

        await Promise.all(productPromises);

        res.status(201).send('Invoice created successfully');
    } catch (error) {
        res.status(500).send('Error creating invoice');
    }
});

// GET Invoices route
app.get('/api/invoices', async (req, res) => {
    const { page, size } = req.query;
    const limit = size ? parseInt(size) : 10;
    const offset = page ? page * limit : 0;

    try {
        const invoices = await Invoice.findAndCountAll({
            limit: limit,
            offset: offset,
            order: [['createdAt', 'DESC']],
            include: [InvoiceProduct]
        });

        res.status(200).send({
            totalItems: invoices.count,
            invoices: invoices.rows,
            totalPages: Math.ceil(invoices.count / limit),
            currentPage: page ? parseInt(page) : 0
        });
    } catch (error) {
        res.status(500).send('Error fetching invoices');
    }
});

// Run the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
