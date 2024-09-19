const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const login = require("./router/login");
const register = require("./router/registeruser");
const getAllUser = require("./router/userlist");
const addPostData = require("./router/addpost");
const getAllPost = require("./router/getallpost");
const comment = require("./router/comment")
const addComment = require("./router/addcommentonpost")
const  getList = require('./router/commentlist')


const port = 3000;
const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.use(register);
app.use(login); 
app.use(getAllUser);
app.use(addPostData);
app.use(getAllPost);
app.use(comment);
app.use(addComment)
app.use(getList);

const server = app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
