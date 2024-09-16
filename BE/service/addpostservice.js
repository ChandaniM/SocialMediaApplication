let { add_post_data } = require("../config/db-query");
const pool = require("../config/db");

const addPost = (postData) => {
    let { user_id, post_content, media_type, created_at, likes_count, comments_count } = postData;
    let values = [user_id, post_content, media_type, created_at, likes_count, comments_count];
    try {
        pool.query(add_post_data, values);
        return "Data inserted successfully"
    } catch (err) {
        console.error("Error inserting data", err);
        return "Error inserting data"
    }
}
module.exports = {
    addPost
}