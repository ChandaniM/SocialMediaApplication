const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'some-postgres',
    database: 'sharingDB',
    password: 'root',
    port: 5432,
});

pool.connect()
    .then(() => {
        console.log('Connected to PostgreSQL database');
    })
    .catch(err => {
        console.error('Connection error', err.stack);
    });
module.exports = pool;