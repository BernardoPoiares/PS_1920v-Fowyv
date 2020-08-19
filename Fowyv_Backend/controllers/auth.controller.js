import config from "../config/auth.config";

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import {runTransaction} from '../db/dbClient.js'
const mongodb = require('mongodb');


exports.signup = async (req, res) => {

  try{

    await runTransaction(async (db,opts) => {

      const data = await db.collection('Users').insertOne(
      {
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
      }, {}, opts);

      const data1 = await db.collection('UsersSearchSettings').insertOne(
      {
        email: req.body.email,
        likedUsers:[],
        dislikedUsers:[]
      }, {}, opts);

      const data2 = await db.collection('UsersChoises').insertOne(
        {
          email: req.body.email,
          minSearchAge:18,
          maxSearchAge:35,
          searchGenders:['female','male'],
          languages:["English"]
        }, {}, opts);

    });

    var token = jwt.sign({ email: req.body.email }, config.secret, {
      expiresIn: 86400 // 24 hours
    });

    res.status(200).json({
      email: req.body.email,
      token: token
    });

  }catch(error){
    res.status(500).send({ message: error });
    return;
  }

};

exports.signin = (req, res) => {

  try{

    const user = await runTransaction(async (db,opts) => {

        return await db.collection("Users").findOne({email:req.body.email}, opts);

    });

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

  }catch(error){
    res.status(500).send({ message: error });
    return;
  }

};

exports.signout = (req, res) => {
      res.status(200).send();
  };

  