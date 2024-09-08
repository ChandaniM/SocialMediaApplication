let {LoginQuery} = require("../Query/db-query");
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "root",
  host: "localhost",
  port: 5432,
  database: "sharingDB",
});

async function login(username, password) {
    const result = await pool.query(LoginQuery, [username]);
    const user = result.rows[0];
    if (user) {
        if (user.password === password) {
            return {
                user,
                message: "Successful login",
                isLoginIn : true
            };
        } else {
            return { 
                isLoginIn : false,
                message: "Invalid username or password"
             }
        }
    } else {
      return { 
            isLoginIn :false,
            message: "Invalid username or password"
         }
    }


}
module.exports = {
    login,
}