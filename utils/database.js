const mysql = require('mysql');
const config = {
    host: '127.0.0.1',
    user: 'candxkxa_candybot',
    password: 'b@8L!66T6Kxx',
    database: 'candxkxa_candyBot',
    connectionLimit: 50,
};

const pool = mysql.createPool(config);

const connection = () => {
    return new Promise((resolve, reject) => {
        // eslint-disable-next-line no-shadow
        pool.getConnection((err, connection) => {
            if (err) reject(err);
            console.log('MySQL pool connected: threadId ' + connection.threadId);
            const query = (sql, binding) => {
                return new Promise((resolve, reject) => {
                    connection.query(sql, binding, (err, result) => {
                        if (err) reject(err);
                        resolve(result);
                    });
                });
            };
            const release = () => {
                return new Promise((resolve, reject) => {
                    if (err) reject(err);
                    console.log('MySQL pool released: threadId ' + connection.threadId);
                    resolve(connection.release());
                });
            };
            resolve({ query, release });
        });
    });
};
const query = (sql, binding) => {
    return new Promise((resolve, reject) => {
        // eslint-disable-next-line no-unused-vars
        pool.query(sql, binding, (err, result, fields) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};
module.exports = { pool, connection, query };

