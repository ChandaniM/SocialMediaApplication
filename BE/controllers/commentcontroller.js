const  {commentPost} = require("../service/postservice")

const postCommentCount = async (req,res)=>{
    try {
       let dataFromApi = req.body;
       let responseFromService   = await commentPost(dataFromApi); 
       res.status(200).send(responseFromService);
    } catch (error) {
        res.status(500).send({ message: error.message });
        
    }
}

module.exports = {
    postCommentCount
}