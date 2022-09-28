const {Router} = require("express");

const register = require("./auth/register")
const login = require("./auth/login")

const getCharacters = require("./getPersonajes")
const getMovies = require("./getPeliculas")

const crudCharacter = require("./crudPersonajes")

const router = Router()

router.use("/auth/register",register)
router.use("/auth/login",login)

router.use("/characters",getCharacters)
router.use("/movies",getMovies)

router.use("/character",crudCharacter)


module.exports = router;