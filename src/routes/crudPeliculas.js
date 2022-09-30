const auth = require("../middleware/auth");
const {Router} = require("express")
const {Personaje,Pelicula,Genero} = require("../database.js");

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
        const pelicula_generos = await Pelicula.findOne({
            where:{
                id:id,
            },
            include:{
                model: Genero,
                attributes:["name","image"],
                through:{
                    attributes:[]
                }
            }
        })
        // console.log(pelicula_generos.generos)
        if(!pelicula) return res.status(404).send("Pelicula not found")
        
        pelicula_generos.dataValues.personajes = pelicula.dataValues.personajes

        console.log(pelicula.dataValues)
        res.status(200).send(pelicula_generos)
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
})


router.post("/",auth,async(req,res)=>{
    try {
        const {title,image,calification,genres} = req.body

        if(!(title && image && calification && genres))return res.status(400).send("All input required: title, image,calification,genres[]")
        
        const peliFound = await Pelicula.findOne({
            where:{
                title: title
            }
        })
        if(peliFound) return res.status(400).send("Pelicula already exist")

        const arrayGenero = genres.map(m=> m.name)
        console.log(arrayGenero)
        const genresFound = await Genero.findAll({
            where:{name: arrayGenero}
        })    
        console.log(genresFound)
        const filteredGenres = genres.filter(({ name: id1 }) => !genresFound.some(({ name: id2 }) => id2 === id1));
        const createdGenres = await Genero.bulkCreate(filteredGenres)
       console.log(filteredGenres)
        const genresDB = await Genero.findAll({
            where:{name: arrayGenero}
        })    

        const createdPelicula = await Pelicula.create({
            title,
            image,
            calification
        },{
            include:{
                model: Genero,
                attributes:["name","image"],
                through:{
                    attributes:[]
                }
            }
        })

        createdPelicula.addGeneros(genresDB)

        res.status(200).send(createdPelicula)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

router.put("/:id",auth,async(req,res)=>{
    try {
        const {id} = req.params
        if(!id) res.send("Pelicula id required")
        // let key;
        // let value;
        // for(const property in req.body){
        //     key = property
        //     value = req.body[property]
        // }
        
        const FoundPelicula = await Pelicula.findOne({
            where:{
                id: id
            }
        })
        
        for(const prop in req.body){
            if(prop === "genre"){
                const genresDB = await Genero.findAll({
                    where:{name: req.body[prop]}
                })  
                const arrayGenero = genresDB.map(m=> m.name)
                
                const filteredGenres = req.body[prop].filter(p => !arrayGenero.includes(p))
                console.log(filteredGenres)
                const arrayGenres = filteredGenres.map(p => {
                    return {
                        name: p
                    }
                })
                const allGenres = await Genero.bulkCreate(arrayGenres)
                console.log(allGenres)
                const genres = await Genero.findAll({
                    where:{name: req.body[prop]}
                }) 

                FoundPelicula.addGeneros(genres)
            }else if(prop === "personajes"){
                const allPersonajes = await Personaje.findAll({
                    where:{
                        name: req.body[prop]
                    }
                })
                await FoundPelicula.addPersonajes(allPersonajes)
            }else{
                FoundPelicula[prop] = req.body[prop]
            }
        }

        await FoundPelicula.save()
        res.status(200).send("Updated succefully")
    } catch (err) {
        console.log(err)
        res.status(400).send({msg: "Remember the properties are title, image,calification,genres[name],personajes[name]", error: err})
    }



})


router.delete("/:id",auth,async(req,res)=>{
    try {
        const {id} = req.params
        console.log(id)
        if(!id)return res.status(400).send("Pelicula id required")

        const peliFound = await Pelicula.findOne({
            where:{
                id: id
            }
        })

        if(!peliFound) return res.status(400).send("Pelicula already deleted")

        await Pelicula.destroy({
            where:{
                id: id
            }
        })

        res.status(200).send("Pelicula deleted succesfully")
    } catch (error) {
        res.status(400).send(error)
    }
})




module.exports = router;