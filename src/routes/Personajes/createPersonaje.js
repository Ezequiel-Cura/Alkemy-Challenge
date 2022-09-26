const auth = require("../../middleware/auth");
const {Router} = require("express")
const {Personaje,Pelicula} = require("../../database.js")
const router = Router()


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
            personaje_image: image,
            age,
            weight,
            pelicula:movies
        },{
            include: Pelicula
        })
        
        personaje.addPeliculas(peliculasDB)

        console.log(personaje)

        res.status(200).send({msg:"Personaje created succefully",personaje})
    } catch (error) {
        console.log(error)
    }
});

module.exports = router