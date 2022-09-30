const Router = require("express");
const bcrypt = require("bcrypt")

const {User} = require("../../database.js");


const router = Router()


router.post("/", async (req, res) => {    
  try {
    const { name, email, password } = req.body;
    
    if (!(email && password && name)) {
      res.status(400).send("All input is required");
    }

    const oldUser = await User.findOne({ where:{email: email} });
   
    if (oldUser) {
      return res.status(400).send("User Already Exist. Please Login");
    }
    
    encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: email.toLowerCase(), 
      password: encryptedPassword,
    });


    res.status(201).json({msg:"You have been registered, please now login",user:user});
  } catch (err) {
    console.log(err);
    res.status(400).send(err)
  }
});


module.exports = router;