const auth = require("../middleware/auth");
const {Router} = require("express")

const {Personaje,Pelicula} = require("../database.js")
const router = Router()


router.get("/", auth, async(req, res) => {
    try {
        const {age,name,movie} = req.query
        if(age){
            const character = await Personaje.findAll({
                where:{
                    age:age
                },
                include : {
                    model: Pelicula,
                    attributes: ["id","title","pelicula_genre","calification"],
                    through:{
                        attributes:[]
                    }
                }
            })
            return res.status(200).send({"number of characters": character.length, characters: character})

        }
        if(name){
            const character = await Personaje.findAll({
                where:{
                    name: name
                },
                include : {
                    model: Pelicula,
                    attributes: ["id","title","pelicula_genre","calification"],
                    through:{
                        attributes:[]
                    }
                }
            })
            return res.status(200).send({"number of characters": character.length, characters: character})

        }
        if(movie){ 
            const character = await Personaje.findAll({
                include : {
                    model: Pelicula,
                    attributes: ["id","title","pelicula_genre","calification"],
                    through:{
                        attributes:[]
                    },
                    where:{
                        id: movie
                    },
                }
            })
            
            return res.status(200).send({"number of characters": character.length, characters: character})

        }

        const allCharacters = await Personaje.findAll({attributes:["id","name","personaje_image"]})

        res.status(200).send({"number of characters": allCharacters.length, characters: allCharacters})
    } catch (error) {
        console.log(error)
    }
});

module.exports = router