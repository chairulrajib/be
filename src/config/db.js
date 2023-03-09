const mysql = require('mysql');

const dbConf = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'alrid303',
    database: 'prw'
})

module.exports = {
    dbConf
}