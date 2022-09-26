const auth = require("../../middleware/auth");
const {Router} = require("express")
const {Personaje,Pelicula} = require("../../database.js")
const router = Router()


router