const auth = require("../middleware/auth");
const {Router} = require("express")

const {Pelicula} = require("../database.js")
const router = Router()


router.get("/", auth, async(req, res) => {
    try {
        const allPelicula = await Pelicula.findAll({attributes:["id","title","createdAt"]})

        res.status(200).send({"number of Peliculas": allPelicula.length, peliculas: allPelicula})
    } catch (error) {
        console.log(error)
    }
});

module.exports = router