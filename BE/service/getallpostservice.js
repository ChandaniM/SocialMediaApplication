const { get_all_post  , get_user_details} = require("../config/db-query");
const pool = require("../config/db");

const getAllPost = async (userId) => {
   let  allComments = {}
    try {
        const postsResult = await pool.query(get_all_post, [userId]);
        const posts = postsResult.rows;

        const userDataResult = await pool.query(get_user_details, [userId]);
        let userDetails = userDataResult.rows[0];
        
            for (const element of posts) {
              let data = await  getDbDataBasedOnPostId(element.id);
              allComments[element.id] = data
            }

        if (!userDetails) {
            throw new Error("User details not found");
        }


        const postsWithUserData = posts.map(post => ({
            ...post,
            username: userDetails.username || 'DEFUALT User',
            userheadline: userDetails.user_headline || 'Software developer',
            profile_picture: userDetails.profile_picture || 'https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-user-2264922221',
            comment : allComments[post.id]
        }));

      
        return postsWithUserData;
    } catch (error) {
        console.error("Error querying the database", error);
        throw error;  
      }
};

const getDbDataBasedOnPostId = async (id)=>{

    const commentDB = await pool.query("SELECT * FROM comments WHERE post_id = $1", [id]);
   
    const commentsWithoutUserId = commentDB.rows.map(({ user_id, ...rest }) => {
        return rest;
    });

    console.log(commentsWithoutUserId, "this is the output of final");
    return commentsWithoutUserId; 
}

module.exports = {
    getAllPost
};
