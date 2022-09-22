const auth = require("../../middleware/auth");
const {Router} = require("express")

const router = Router()


router.post("/", auth, async(req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

module.exports = router