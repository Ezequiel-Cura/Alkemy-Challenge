const auth = require("../middleware/auth");
const {Router} = require("express")
const {Personaje,Pelicula} = require("../database.js")
const router = Router()


router.get("/:id", auth, async(req, res) => {
    try {
        
        const {id} = req.params

        const character = await Personaje.findOne({
            where: {
                id : id
            },
            include : {
                model: Pelicula,
                attributes: ["id","title","genre","calification"],
                through:{
                    attributes:[]
                }
            }
        })

        res.status(200).send(character)
    } catch (error) {
        console.log(error)
    }
});



router.post("/", auth, async(req, res) => {
    try {
        const {name,image,age,weight,movies} = req.body
        
        if(!(name && image && age && weight)) res.status(400).send("All inputs required")
        
        const oldPersonaje  = await Personaje.findOne({where:{name:name}})
        if(oldPersonaje) return res.status(400).send("Personaje already exist")
        
        const arrayMovies = movies.map(m=> m.title)
        
        const moviesFound = await Pelicula.findAll({
            where:{title: arrayMovies}
        })    
        
        const filteredMovies = movies.filter(({ title: id1 }) => !moviesFound.some(({ title: id2 }) => id2 === id1));
        const createdMovies = await Pelicula.bulkCreate(filteredMovies)
        
        const peliculasDB = await Pelicula.findAll({
            where: {title: arrayMovies}
        })    
        
        const personaje = await Personaje.create({
            name,
            image,
            age,
            weight,
            pelicula:movies
        },{
            include: Pelicula
        })    
        
        personaje.addPeliculas(peliculasDB)
        
        
        
        res.status(200).send({msg:"Personaje created succefully",personaje})
    } catch (error) {
        console.log(error)
    }    
});    

router.put("/:id",auth,async(req,res)=>{
    
    try {
        const {id} = req.params
        if(!id) res.send("Personaje id required")
        let key;
        let value;
        for(const property in req.body){
            key = property
            value = req.body[property]
        }
        console.log(key+ " " + value)
        const Foundpersonaje = await Personaje.findOne({
            where:{
                id: id
            }
        })

        Foundpersonaje[key] = value
        await Foundpersonaje.save()
        res.status(200).send("Updated succefully")
    } catch (err) {
        res.status(400).send({msg: "Remember one property per requeste can be updated", error: err})
    }
})


router.delete("/:id",auth,async(req,res)=>{
    
    try {
        const {id} = req.params
        if(!id) res.status(400).send("Personaje id required")
        await Personaje.destroy({
            where: {
                id: id
            }
        })
        res.status(200).send("Personaje deleted succesfully")
    } catch (error) {
        res.status(400).send(error)
    }
})






module.exports = router