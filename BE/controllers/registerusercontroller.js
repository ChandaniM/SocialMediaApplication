const registerService = require("../service/registeruserservice")
module.exports = {
    async register(req,res) {
        try{
            let {username, email , password , user_headline } = req.body;
            
            console.log(username, email , password )
            let responseFromService = await registerService.register(username , email , password , user_headline);
            console.log(responseFromService)
            res.status(200).send({...responseFromService});
        }catch{
            res.status(500).send({ message: error.message });
        }
    }
}