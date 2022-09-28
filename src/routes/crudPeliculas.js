const auth = require("../middleware/auth");
const {Router} = require("express")
const {Personaje,Pelicula} = require("../database.js")
const router = Router()

router.get("/",auth,(req,res)=>{

})


router.post("/",auth,(req,res)=>{

})

router.put("/",auth,(req,res)=>{

})


router.delete("/",auth,(req,res)=>{

})




module.exports = router;