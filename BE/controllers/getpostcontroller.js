let getPostService = require("../service/getallpostservice")
module.exports = {
    async getAllPost(req,res){
        try{
            const userId = req.query['userId'];
            let responseFromService = await getPostService.getAllPost(userId);
            console.log(responseFromService)
            res.status(200).send(responseFromService);
        }catch(err){
            res.status(500).send({ message: err.message });
        }
    }
}