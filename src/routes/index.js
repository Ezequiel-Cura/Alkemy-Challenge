const {Router} = require("express");

const register = require("./auth/register")


const router = Router()

router.use("/auth/register",register)

module.exports =router;