const auth = require("../../middleware/auth");
const {Router} = require("express")
const {Personaje,Pelicula} = require("../../database.js")
const router = Router()


router.post("/", auth, async(req, res) => {
    try {
        const {name,image,age,weight,movies} = req.body

        if(!(name && image && age && weight)) res.status(400).send("All inputs required")

        const oldPersonaje  = await Personaje.findOne({where:{name:name}})
        if(oldPersonaje) res.status(400).send("Personaje already exist")

        const createdMovies = await Pelicula.bulkCreate(movies)
        console.log(createdMovies)

        const personaje = await Personaje.create({
            name,
            personaje_image: image,
            age,
            weight,
            pelicula:movies
        },{
            include: Pelicula
        })
        console.log(personaje)
        // await personaje.addMovies(createdMovies)

        res.status(200).send({msg:"Personaje created succefully",personaje})
    } catch (error) {
        console.log(error)
    }
});

module.exports = router