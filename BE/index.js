const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const port = 3000;  
const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/",(req,res)=>{
    res.send("Hello from Backend")
  })
const server = app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
  