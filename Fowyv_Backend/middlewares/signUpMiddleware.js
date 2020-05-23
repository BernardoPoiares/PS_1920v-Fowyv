//const db = require("../models");
//const ROLES = db.ROLES;
//const User = db.user;

import controller from "../controllers/auth.controller";
import  Users  from '../dummy/Users';
checkDuplicateEmail = (req, res, next) => {

    // Email
    /*User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }

      next();
    });*/
    if(Users.find(user=>user.email===req.body.email))
      return res.status(500).send({ message: 'User already registered' });
    next();
};

const signUpMiddleware = {
  checkDuplicateEmail
};

module.exports = signUpMiddleware;