const auth = require("../middleware/auth");
const {Router} = require("express")
const {Personaje,Pelicula} = require("../database.js")
const router = Router()

router.get("/:id",auth,async(req,res)=>{
    try {
        const {id} = req.params
        const pelicula = await Pelicula.findOne({
            where:{
                id : id,
            },
            include:{
                model: Personaje,
                through:{
                    attributes:[]
                }
            }
        })
        if(!pelicula) return res.status(404).send("Pelicula not found")
        
        res.status(200).send(pelicula)
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
})


router.post("/",auth,async(req,res)=>{
    try {
        const {title,image,calification,genres} = req.body



        
    } catch (error) {
        
    }
})

router.put("/",auth,async(req,res)=>{

})


router.delete("/",auth,async(req,res)=>{

})




module.exports = router;