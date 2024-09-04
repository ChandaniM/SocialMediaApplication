let { get_all_users } = require("../Query/login");
const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    password: "root",
    host: "localhost",
    port: 5432,
    database: "sharingDB",
});
const getAllUser = async () => {
    try {
        const result = await pool.query(get_all_users);
        return result.rows;
    } catch (err) {
        console.error('Error inserting user', err);
        return { message: 'Error adding user' };
    }
}
module.exports = {
    getAllUser
}