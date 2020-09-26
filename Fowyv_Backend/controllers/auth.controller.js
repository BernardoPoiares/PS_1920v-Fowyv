import authConfig from "../config/auth.config";
import appSettings from "../config/appSettings.config";
import {Collections} from "../config/dbSettings.config";



import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import {runQuery, runTransaction} from '../db/dbClient.js'

exports.signup = async (req, res) => {

  try{

    await runTransaction(async (db,opts) => {

      await db.collection(Collections.Users).insertOne(
        {
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 8)
        }, {}, opts);

      await db.collection(Collections.UsersChoices).insertOne(
      {
        email: req.body.email,
        likedUsers:[],
        dislikedUsers:[]
      }, {}, opts);

      await db.collection(Collections.UsersSearchSettings).insertOne(
        {
          email: req.body.email,
          minSearchAge:appSettings.minSearchAge,
          maxSearchAge:appSettings.maxSearchAge,
          searchGenders:appSettings.genders
        }, {}, opts);

    });

    var token = jwt.sign({ email: req.body.email }, authConfig.secret, {
      expiresIn: authConfig.tokenExpirationTime
    });

    res.status(200).json({
      email: req.body.email,
      token: token
    });

  }catch(error){
    res.status(500).json({ message: error });
    return;
  }

};

exports.signin = async (req, res) => {

  try{

    const user = await runQuery(async (db,opts) => {

        return await db.collection(Collections.Users).findOne({email:req.body.email}, opts);

    });

    if (!user) {
      return res.status(401).json({ message: "Email or password incorrect" });
    }

    var passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).json({
        message: "Email or password incorrect"
      });
    }

    var token = jwt.sign({ email: user.email }, authConfig.secret, {
      expiresIn: authConfig.tokenExpirationTime
    });

    res.status(200).json({
      email: user.email,
      token: token
    });

  }catch(error){
    res.status(500).json({ message: error });
    return;
  }

};

exports.deleteUser = async (req, res) => {

  try{

    await runTransaction(async (db,opts) => {

        await db.collection(Collections.UsersMatches).deleteMany({ emails: req.email}, opts);      

        await db.collection(Collections.UsersChoices).deleteOne( { email: req.email }, opts); 

        await db.collection(Collections.UsersSearchSettings).deleteOne( { email: req.email }, opts);

        await db.collection(Collections.UsersDetails).deleteOne( { email: req.email }, opts);

        await db.collection(Collections.Users).deleteOne( { email: req.email }, opts);

    });

    res.status(200).send();

  }catch(error){
    res.status(500).json({ message: error });
    return;
  }

};

exports.signout = (req, res) => {
      res.status(200).send();
  };

