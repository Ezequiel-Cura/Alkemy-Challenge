const server = require("./app")
const {conn} = require("./database")

conn.sync({force:false}).then(()=>{
    server.listen(server.get("port"),()=>{
        console.log("Server Listening " + server.get("port"))
    })
})