const express = require("express");
const router = express.Router();
const { attachCookiesTOResponse } = require('../utils');

router.get("/login", async (req, res) => {
  res.render("login");
});
router.get("/moblogin", async (req, res) => {
  res.render("moblogin");
});
router.get("/signup", async (req, res) => {
  res.render("signup");
});

router.post("/login", async (req, res) => {
  console.log(req.body.email);
  const email = String(req.body.email);
  const tuser = { email: email };
  attachCookiesTOResponse({ res, user: tuser });
  return res.redirect("/");
});
router.post("/googlelogin", async (req, res) => {
  if (req.body.email) {
    const email = String(req.body.email);
    const tuser = { email: email };
    attachCookiesTOResponse({ res, user: tuser });
    return res.redirect("/"); // success status
  } else {
    return res.sendStatus(400); // error status
  }
});
router.post("/signup", async (req, res) => {
  if (req.body) {
    email = String(req.body);
    const tuser = { email: email };
    attachCookiesTOResponse({ res, user: tuser });
    return res.redirect("/select"); // success status
  } else {
    return res.sendStatus(400); // error status
  }
});
router.post("/signout", (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  return res.redirect("/");
});

module.exports = router;
