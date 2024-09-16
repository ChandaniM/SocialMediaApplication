let {add_user} = require("../config/db-query");
const pool = require("../config/db");

const register = async(username , email, password) => {
    try {
        const result = await pool.query(add_user, [username, email, password]);
        console.log(result.rows[0], 'Data inserted successfully');
       return { message: 'User added successfully', user: result.rows[0] };
    } catch (err) {
        console.error('Error inserting user', err);
        return { message: 'Error adding user' };
    }
}
module.exports = {
    register,
}