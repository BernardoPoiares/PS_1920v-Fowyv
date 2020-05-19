const config = require("../config/auth.config");
//const db = require("../models");
//const User = db.user;
//const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

/*exports.signup = (req, res) => {
  const user = new User({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
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
    }
  });
};*/

exports.signin = (req, res) => {
  /*User.findOne({
    username: req.body.username
  })*/
    const exec=((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      /*var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );*/
      var passwordIsValid= user.password === req.body.password;
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
    
    if(req.body.email==='a@a.a')
    return exec (null,{email:"a@a.a",password:"hello"})
    return exec (null,null)
};

exports.signout = (req, res) => {
      res.status(200).send();
  };