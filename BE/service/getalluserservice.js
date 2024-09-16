let { get_all_users } = require("../config/db-query");
const pool = require("../config/db"); 

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