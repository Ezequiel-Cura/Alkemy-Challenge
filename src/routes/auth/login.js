const auth = require("../../middleware/auth");
const {Router} = require("express")
const jwt = require("jsonwebtoken")

const router = Router()

const {User} = require("../../database.js");



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

    if(!userFound) res.status(400).send("User not found, register please")


    

    const token = jwt.sign(
      { user_id: user.id, email },
      process.env.SECRET,
      {
        expiresIn: "24h",
      }
    );
  




    res.status(200).send("Welcome 🙌 ");
    
  } catch (error) {
    
  }



});

module.exports = router