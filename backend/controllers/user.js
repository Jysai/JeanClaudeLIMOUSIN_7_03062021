const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const models = require("../models");

// const EMAIL_REGEX =
//   /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

exports.signup = (req, res, next) => {
  if (
    req.body.email == null ||
    req.body.username == null ||
    req.body.password == null
  ) {
    return res.status(400).json({ error: "missing parameters" });
  }

  // if (req.body.username.length > 13 ||req.body.username.length < 5 ) {
  //   return res.status(400).json({ error: "wrong username (must be lenght 5 - 13)" });
  // }

  // if (!EMAIL_REGEX.test(req.body.email)) {

  // }

  // console.log(req.body);
  models.User.findOne({
    // attributes: ["email"],
    where: { email: req.body.email },
  })
    .then(function (userFound) {
      // console.log(userFound);
      if (!userFound) {
        bcrypt
          .hash(req.body.password, 5)
          .then(function (bcryptedPassword) {
            return models.User.create({
              email: req.body.email,
              username: req.body.username,
              password: bcryptedPassword,
            });
          })
          .then(function (newUser) {
            return res.status(201).json({
              userId: newUser.id,
            });
          })

          .catch(function (err) {
            return res.status(500).json({ error: "cannot add user" });
          });
      } else {
        return res.status(409).json({ error: "user already exist" });
      }
    })
    .catch(function (err) {
      return res.status(500).json({ error: err });
    });
};

exports.login = (req, res, next) => {
  models.User.findOne({
    // attributes: ["email"],
    where: { email: req.body.email },
  })
    .then(function (userFound) {
      // console.log(userFound)
      if (!userFound) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      } else {
        bcrypt
          .compare(req.body.password, userFound.password) // comparaison du mot de passe
          .then((valid) => {
            if (!valid) {
              return res
                .status(401)
                .json({ error: "Mot de passe incorrect !" });
            } else {
                res.status(200).json({
                userId: userFound.id,
                token: jwt.sign(
                  { userId: userFound.id },
                  "RANDOM_TOKEN_SECRET",
                  {
                    expiresIn: "24h",
                  }
                ),
              });
            }
          })
          .catch((error) => res.status(500).json({ error }));
      }
    })
    .catch((error) => res.status(500).json({ error: "cette erreur" }));
};

exports.me = (req, res, next) => {
  models.User.findOne({
    attributes: ["id", "email", "username"],
    // where: { userId: req.body.userId },
    where: { id: req.body.userId },
  })
    .then(function (userFound) {
      if (userFound) {
        res.status(201).json(userFound);
      } else {
        res.status(404).json({ error: "user not found" });
      }
    })
    .catch(function (err) {
      res.status(500).json({ error: "cannot fetch user" });
    });
};

exports.updateUserProfile = (req, res, next ) => {
  models.User.findOne({
    attributes: ['id', 'email', 'username' ],
    where: { id: req.body.userId },
  }).then(function (userFound){
    if (userFound) {
      userFound.update({
        username: (req.body.username ? req.body.username : userFound.username),
        email: (req.body.email ? req.body.email : userFound.email)
      })
      res.status(201).json(userFound)
    } else {
      res.status(404).json({'error' : 'user not found'})
    }
  }).catch(function(err){
    res.status(500).json({'error' : 'cannot fetch user'})
  })
}

