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
                model: Genero,
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

        if(!(title && image && calification && genres))return res.status(400).send("All input required: title, image,calification,genres[]")
        
        const peliFound = await Pelicula.findOne({
            where:{
                title: title
            }
        })
        if(peliFound) return res.status(400).send("Pelicula already exist")

        const arrayGenero = genres.map(m=> m.name)

        const genresFound = await Genero.findAll({
            where:{name: arrayGenero}
        })    
        
        const filteredGenres = genres.filter(({ name: id1 }) => !genresFound.some(({ name: id2 }) => id2 === id1));
        const createdGenres = await Genero.bulkCreate(filteredGenres)
       
        const genresDB = await Genero.findAll({
            where:{name: arrayGenero}
        })    

        const createdPelicula = await Pelicula.create({
            title,
            image,
            calification
        },{
            include:Genero
        })

        createdPelicula.addGeneros(genresDB)

        res.status(200).send(createdPelicula)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

router.put("/",auth,async(req,res)=>{
    try {
        const {id} = req.params
        if(!id) res.send("Pelicula id required")
        let key;
        let value;
        for(const property in req.body){
            key = property
            value = req.body[property]
        }
        console.log(key+ " " + value)
        const FoundPelicula = await Pelicula.findOne({
            where:{
                id: id
            }
        })

        FoundPelicula[key] = value
        await FoundPelicula.save()
        res.status(200).send("Updated succefully")
    } catch (err) {
        res.status(400).send({msg: "Remember one property per requeste can be updated", error: err})
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

        if(!peliFound) return res.status(400).send("Pelicula alredy deleted")

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