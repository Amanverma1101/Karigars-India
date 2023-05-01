const express = require("express");
const router = express.Router();

const {
  loginreq,
  signupreq,
  signoutreq
} = require('../controllers/auth');

router.get("/login", async (req, res) => {
  res.render("login");
});
router.get("/moblogin", async (req, res) => {
  res.render("moblogin");
});
router.get("/signup", async (req, res) => {
  res.render("signup");
});

router.post("/login", loginreq);
router.post("/googlelogin",loginreq);
router.post("/signup", signupreq);
router.post("/signout", signoutreq);

module.exports = router;
