let {add_user} = require("../Query/db-query");
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "root",
  host: "localhost",
  port: 5432,
  database: "sharingDB",
});

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