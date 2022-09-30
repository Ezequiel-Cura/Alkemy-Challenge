const auth = require("../middleware/auth");
const {Router} = require("express")

const {Pelicula,Personaje,Genero} = require("../database.js");

const router = Router()


router.get("/", auth, async(req, res) => {
    try {
        const {title,genre,order} = req.query

        if(title){
            const pelicula = await Pelicula.findOne({
                where:{
                    title : title
                },
                include:{
                    model: Personaje,
                    attributes: ["id","name","age","weight","image"],
                    through:{
                        attributes:[]
                    }
                }

            })
            const pelicula_generos = await Pelicula.findOne({
                where:{
                    title:title,
                },
                include:{
                    model: Genero,
                    attributes:["name","image"],
                    through:{
                        attributes:[]
                    }
                }
            })
            if(!pelicula) return res.status(404).send("Pelicula not found")

            console.log(pelicula)
            pelicula_generos.dataValues.personajes = pelicula.dataValues.personajes

            return res.status(200).send(pelicula_generos)
        }
        if(genre){
            const pelicula = await Pelicula.findAll({
                include : {
                    model: Personaje,
                    attributes: ["id","name","age","weight","image"],
                    through:{
                        attributes:[]
                    },
                    where:{
                        id: genre
                    },
                }
            })
            return res.status(200).send(pelicula)
        }
        if(order){
            if(order === "ASC"){
                console.log("Hola")
                const ascPeliculas = await Pelicula.findAll({
                    order:[
                        ["createdAt","ASC"]
                    ]                     
                })
                console.log(ascPeliculas)
                return res.status(200).send(ascPeliculas)
            }
            if(order === "DES"){
                const desPeliculas = await Pelicula.findAll({
                    order:[
                        ["createdAt","DES"]
                    ]                     
                })
                return res.status(200).send(desPeliculas)
            }
            
        }

        const allPelicula = await Pelicula.findAll({attributes:["id","title","createdAt"]})

        res.status(200).send({"number of Peliculas": allPelicula.length, peliculas: allPelicula})
    } catch (error) {
        console.log(error)
    }
});

module.exports = router