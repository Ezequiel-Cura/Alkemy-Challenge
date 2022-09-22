const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const routes = require("./routes/index");

const server = express()

server.set("port",process.env.PORT || 5000)


server.use(bodyParser.urlencoded({extended:true}))
server.use(bodyParser.json())
server.use(morgan("dev"))


server.use("/",routes);




module.exports = server;