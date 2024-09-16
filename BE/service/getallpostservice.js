const { get_all_post  , get_user_details} = require("../config/db-query");
const pool = require("../config/db");

const getAllPost = async (userId) => {
    try {
        const postsResult = await pool.query(get_all_post, [userId]);
        const posts = postsResult.rows;

        const userDataResult = await pool.query(get_user_details, [userId]);
        let userDetails = userDataResult.rows[0];

        if (!userDetails) {
            throw new Error("User details not found");
        }

        const postsWithUserData = posts.map(post => ({
            ...post,
            username: userDetails.username || 'DEFUALT User',
            userheadline: userDetails.user_headline || 'Software developer',
            profile_picture: userDetails.profile_picture || 'https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-user-2264922221',
        }));

        console.log(postsWithUserData);
        return postsWithUserData;
    } catch (error) {
        console.error("Error querying the database", error);
        throw error;  
      }
};

module.exports = {
    getAllPost
};
