const loginService = require("../service/loginservice")
module.exports = {
    async loginUser(req,res) {
        try{
            let {email , password } = req.body;
            let responseFromService = await loginService.login(email , password);
            console.log(responseFromService)
            res.status(200).send({...responseFromService});
        }catch{
            res.status(500).send({ message: error.message });
        }
    }
}