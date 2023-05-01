const { attachCookiesTOResponse } = require('../utils');

const loginreq = async (req, res) => {
    if (req.body.email) {
      const email = String(req.body.email);
      const tuser = { email: email };
      attachCookiesTOResponse({ res, user: tuser });
      return res.redirect("/"); // success status
    } else {
      return res.sendStatus(400); // error status
    }
  }

  const signupreq = async (req, res) => {
    if (req.body) {
      email = String(req.body);
      const tuser = { email: email };
      attachCookiesTOResponse({ res, user: tuser });
      return res.redirect("/select"); // success status
    } else {
      return res.sendStatus(400); // error status
    }
  }

  const signoutreq = (req, res) => {
    res.cookie("token", "logout", {
      httpOnly: true,
      expires: new Date(Date.now()),
    });
    return res.redirect("/");
  }

  module.exports = {
    loginreq,
    signupreq,
    signoutreq
  }
