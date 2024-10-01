let { add_post_data } = require("../config/db-query");
const pool = require("../config/db");

const addPost = async (postData) => {
    let { user_id, post_content, media_type, created_at, likes_count } = postData;
    let values = [user_id, post_content, media_type, created_at, likes_count];
    console.log(postData , "::::: THIS IS ADD_POST_DATA FROM SERVICES  ::")
    try {
        const result = await pool.query("INSERT INTO user_posts (user_id, post_content, media_type, created_at, likes_count) VALUES ($1, $2, $3, $4, $5)", values);
        console.log(result , "this is from add post service")
        return "Data inserted successfully"
    } catch (err) {
        console.error("Error inserting data", err);
        return "Error inserting data"
    }
}

module.exports = {
    addPost
}