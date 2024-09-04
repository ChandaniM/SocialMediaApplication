// const file 
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Pool } = require("pg");
const login = require("./router/login");
const register = require("./router/registeruser");

const pool = new Pool({
  user: "postgres",
  password: "root",
  host: "localhost",
  port: 5432,
  database: "sharingDB",
});


const port = 3000;
const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.use(register)
app.use(login); 





const server = app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
