let { update_post_comment } = require("../config/db-query");
const pool = require("../config/db");
 
const likePost = async (value) => {
  try {
  } catch (error) {}
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
module.exports = {
  likePost,
  commentPost,
};
