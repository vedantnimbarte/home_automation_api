const express = require("express");
const Connection = require("../lib/connection");
const router = express.Router();

router.post("/login", function (req, res, next) {
  const { email, password } = req.body;
  console.log(email, password);
  const auth = new Connection();
  auth
    .login(email, password)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => console.error(error));
});

module.exports = router;
