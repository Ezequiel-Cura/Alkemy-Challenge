const {Router} = require("express");

const register = require("./auth/register")
const login = require("./auth/login")

const getCharacters = require("./getPersonajes")

const createCharacter = require("./Personajes/createPersonaje")
const router = Router()

router.use("/auth/register",register)
router.use("/auth/login",login)

router.use("/characters",getCharacters)

router.use("/character",createCharacter)


module.exports =router;