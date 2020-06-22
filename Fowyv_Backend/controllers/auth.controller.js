import config from "../config/auth.config";
//const db = require("../models");
//const User = db.user;
//const Role = db.role;

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import Users from '../dummy/Users';
import AudioFiles from '../dummy/AudioFiles';
import UsersChoises from '../dummy/UsersChoises';
import UsersMatches from '../dummy/UsersMatches';
import UsersSearchSettings from '../dummy/UsersSearchSettings';


exports.signup = (req, res) => {
  /*const user = new User({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }*/
    Users.push({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8)
    });
    UsersChoises.push({
      email: req.body.email,
      likedUsers:[],
      dislikedUsers:[]});
    UsersSearchSettings.push(
      {email: req.body.email, minSearchAge:18, maxSearchAge:35, searchGenders:['female'], languages:["English"]});
    /*if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    }*/
    var token = jwt.sign({ email: req.body.email }, config.secret, {
      expiresIn: 86400 // 24 hours
    });
    res.status(200).json({
      email: req.body.email,
      token: token
    });
};

exports.signin = (req, res) => {
  /*User.findOne({
    username: req.body.username
  })*/
  const user=Users.find(user=>user.email===req.body.email)
    const exec=((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          token: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ email: user.email }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      res.status(200).json({
        email: user.email,
        token: token
      });
    });
    
    return exec (null,user)
};

exports.signout = (req, res) => {
      res.status(200).send();
  };

  