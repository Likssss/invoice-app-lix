const {Sequelize} = require('sequelize')

const data = {
    dbName: 'invoiceDB1',
    dbUsername: 'root',
    dbPassword: 'rootuser123',
    dbHost: 'localhost'
}

const sequelize = new Sequelize(data.dbName, data.dbUsername, data.dbPassword, {
    host: data.dbHost,
    dialect: "mysql"
})

module.exports = sequelize