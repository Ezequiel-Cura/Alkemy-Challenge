const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const routes = require("./routes/index");

const server = express()

server.set("port",process.env.PORT || 5000)

server.use(bodyParser.urlencoded({extended:true}))
server.use(bodyParser.json())
server.use(morgan("dev"))

server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin',"*"); 
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

server.use("/",routes);




module.exports = server;