const Login_crenditical= "SELECT * FROM users WHERE email = $1";
const Add_USER_IN_Table = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *";
const GET_ALL_USERS = "SELECT * FROM users";



exports.LoginQuery = Login_crenditical;
exports.add_user = Add_USER_IN_Table;
exports.get_all_users = GET_ALL_USERS;