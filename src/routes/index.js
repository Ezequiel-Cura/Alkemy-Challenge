const {Router} = require("express");

const register = require("./auth/register")
const login = require("./auth/login")

const getCharacters = require("./getPersonajes")

const crudCharacter = require("./crudPersonajes")

const router = Router()

router.use("/auth/register",register)
router.use("/auth/login",login)

router.use("/characters",getCharacters)


router.use("/character",crudCharacter)


module.exports = router;