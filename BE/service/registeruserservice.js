let {add_user} = require("../config/db-query");
const pool = require("../config/db");

const register = async(username , email, password ) => {
    try {
        console.log(" HELLO FROM SERVICE")
        const result = await pool.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *", [username, email, password ]);
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