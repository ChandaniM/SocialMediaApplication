const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'postgresql://postgres:root@db:5432/sharing_db',
    database: 'sharing_db',
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
// postgresql://username:password@host:port/database