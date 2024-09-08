const addPostService = require("../service/addpostservice");

module.exports = {
    async addPost(req,res){
        try {
            let postData = req.body;
            const response = await addPostService.addPost(req.body);
            res.status(200).send({message :response});
        } catch (error) {
            res.status(500).send({ message: error.message });
            
        }

    }
}