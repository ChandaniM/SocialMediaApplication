const pool = require("../config/db");
let { update_post_comment } = require("../config/db-query");
let { add_comment_post } = require("../config/db-query");

const likePost = async (value) => {
  try {
  } catch (error) { }
};

const commentPost = async (value) => {
  try {
    console.log(value.count, value.id);
    let responseFromDB = await pool.query(update_post_comment, [
      value.count,
      value.id,
    ]);
    console.log(responseFromDB, "this is response from db");
    return responseFromDB.rowCount > 0
      ? { success: true, message: "Comment count updated successfully." }
      : { success: false, message: "No post found with the provided ID." };
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while updating the post.",
      error: error.message,
    };
  }
};

const addCommentOnPost = async (value) => {
  try {
    const responseFromDB = await pool.query(
      "INSERT INTO comments (post_id, user_id, comment_text, created_at, updated_at) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [
        value.id,
        value.user_id,
        value.post_content,
        value.created_at,
        value.updated_at,
      ]
    );
    let result = await pool.query("SELECT * FROM comments WHERE user_id = $1", [
      value.user_id,
    ]);
    return { message: "comment added successfully" };
  } catch (error) {
    console.error("Error adding comment to the database:", error);
    throw error;
  }
};

const getCommentList = async (id) => {
  try {
    if (id) {
      let result = await pool.query(
        "SELECT * FROM comments WHERE post_id = $1",
        [id]
      );
      return result.rows;
    }
  } catch (error) { }
};

module.exports = {
  likePost,
  addCommentOnPost,
  commentPost,
  getCommentList,
};
