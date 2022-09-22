const Router = require("express");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
//models
const {User} = require("../../database.js");


const router = Router()


router.post("/", async (req, res) => {

    
  try {
     
    const { name, email, password } = req.body;
    console.log(email)
    
    if (!(email && password && name)) {
      res.status(400).send("All input is required");
    }

    console.log(req.body)
    const oldUser = await User.findOne({ where:{email: email} });
    console.log("OLDUSER",oldUser)
    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    
    encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: email.toLowerCase(), 
      password: encryptedPassword,
    });

    const token = jwt.sign(
      { user_id: user.id, email },
      process.env.SECRET,
      {
        expiresIn: "2h",
      }
    );
    
    user.token = token;
    await user.save()

    res.status(201).json({msg:"Save the Token for later",user:user});
  } catch (err) {
    console.log(err);
  }
    
});


module.exports = router;