// const auth = require("../../middleware/auth");
const {Router} = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const router = Router()

const {User} = require("../../database.js");
const {sendEmail,sendGridMail} = require("../../Utils/sendEmail.js");



router.post("/", async(req, res) => {

  try {
    const {email, password} = req.body

    if(!(email && password)){
      res.status(400).send("Email and password required")
    }

    const userFound = await User.findOne({
      where:{
        email: email
      }
    })

    if(!userFound) res.status(400).send("User not found, register first")

    const passwordCompare = await bcrypt.compare(password,userFound.password)
    if(passwordCompare === false)res.status(400).send("incorrect password")

    const token = jwt.sign(
      { user_id: userFound.id, email },
      process.env.SECRET,
      {
        expiresIn: "24h",
      }
    );
  
    await sendEmail(email)

    res.status(200).send({
      msg: "Welcome 🙌 here is you token, put it on the header x-access-token. You have 24h before it expires",
      token: token
    });
    

  } catch (error) {
    console.log(error)
  }

//"Welcome 🙌 "

});

module.exports = router