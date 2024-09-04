let allUser = require("../service/getalluserservice")
module.exports = {
    async getAllUser(req,res){
        try{
            let responseFromService = await allUser.getAllUser();
            res.status(200).send(responseFromService);
        }catch{
            res.status(500).send({ message: error.message });
        }
    }
}