const { get_all_post  , get_user_details} = require("../Query/db-query");
const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    password: "root",
    host: "localhost",
    port: 5432,
    database: "sharingDB",
});

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
            user_name: userDetails.username || 'DEFUALT User',
            user_headline: userDetails.user_headline || '',
            profile_picture: userDetails.profile_picture || '',
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
