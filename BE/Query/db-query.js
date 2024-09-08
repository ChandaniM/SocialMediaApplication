const Login_crenditical= "SELECT * FROM users WHERE email = $1";
const Add_USER_IN_Table = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *";
const GET_ALL_USERS = "SELECT * FROM users";
const ADD_POST_DATA = "INSERT INTO user_posts (user_id, post_content, media_type, created_at, likes_count, comments_count) VALUES ($1, $2, $3, $4, $5, $6)";


exports.LoginQuery = Login_crenditical;
exports.add_user = Add_USER_IN_Table;
exports.get_all_users = GET_ALL_USERS;
exports.add_post_data = ADD_POST_DATA;