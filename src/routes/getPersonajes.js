const auth = require("../middleware/auth");
const {Router} = require("express")

const {Personaje} = require("../database.js")
const router = Router()


router.get("/", auth, async(req, res) => {
    try {
        const allCharacters = await Personaje.findAll({attributes:["name","personaje_image"]})

        res.status(200).send({"number of characters": allCharacters.length, characters: allCharacters})
    } catch (error) {
        console.log(error)
    }
});

module.exports = router