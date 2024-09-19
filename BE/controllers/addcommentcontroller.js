let { addCommentOnPost, getCommentList } = require("../service/postservice");

const addCommentOnPostController = async (req, res) => {
    try {
        let reqBody = req.body;
        let response = await addCommentOnPost(reqBody);
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const getCommentControllerList = async (req, res) => {
    try {
        let response = await getCommentList(req.query["id"])
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

module.exports = {
    addCommentOnPostController,
    getCommentControllerList
}