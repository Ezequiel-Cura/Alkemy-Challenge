const Router = require("express");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
//models
const {User} = require("../../database")

const router = Router()


router.post("/", async (req, res) => {

    
  try {
     
    const { name, email, password } = req.body;
    console.log(email)
    
    if (!(email && password && name)) {
      res.status(400).send("All input is required");
    }

    
    const oldUser = await User.findOne({ where:{email: email} });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    
    encryptedPassword = await bcrypt.hash(password, 10);

    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.SECRET,
      {
        expiresIn: "2h",
      }
    );
    const user = await User.create({
      name,
      email: email.toLowerCase(), 
      password: encryptedPassword,
      token:token
    });

    
  

    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
    
});


module.exports = router;