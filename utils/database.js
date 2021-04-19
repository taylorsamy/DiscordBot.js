const sql = require('mssql');
const { dbPass } = require('../config.json');
const config = {
    server: 'DESKTOP-EQ5KKO3',
    user: 'Semikolon',
    password: dbPass,
    database: 'Semikolon',
    // connectionLimit: 50,
};

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Connected to database');
        return pool;
    }).catch(err => console.log('database connection failed', err));


module.exports = { sql, poolPromise };

