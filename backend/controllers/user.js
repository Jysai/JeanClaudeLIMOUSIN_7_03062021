const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const models = require("../models");

exports.signup = (req, res, next) => {
  if (
    req.body.email == null ||
    req.body.firstname == null ||
    req.body.lastname == null ||
    req.body.password == null
  ) {
    return res.status(400).json({ error: "missing parameters" });
  }

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
              firstname: req.body.firstname,
              lastname: req.body.lastname,
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
    attributes: ["id", "email", "firstname", "lastname"],
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

exports.allUsers = (req, res, next) => {
  models.User.findAll({
    attributes: ["id", "firstname", "lastname"],
  })
    .then(function (userFound) {
      if (userFound) {
        res.status(201).json(userFound);
      } else {
        res.status(404).json({ error: "users not found" });
      }
    })
    .catch(function (error) {
      res.status(500).json({ error: "cannot fetch user" });
    });
};

exports.updateUserProfile = (req, res, next) => {
  models.User.findOne({
    // attributes: ["id", "email", "firstname", "lastname"],
    where: { id: req.body.userId },
  })
    .then(function (userFound) {
      if (userFound) {
        userFound.update({
          firstname: req.body.firstname
            ? req.body.firstname
            : userFound.firstname,
          lastname: req.body.lastname ? req.body.lastname : userFound.lastname,
          email: req.body.email ? req.body.email : userFound.email,
        });
        res.status(201).json(userFound);
      } else {
        res.status(404).json({ error: "user not found" });
      }
    })
    .catch(function (err) {
      res.status(500).json({ error: "cannot fetch user" });
    });
};

exports.deleteProfile = (req, res, next) => {
  models.User.findOne({
    where: { id: req.body.userId },
  })
    .then(function (userFound) {
      if (userFound) {
        return userFound.destroy({
          force: true
        });
        
      } else {
        res.status(404).json({ error: "user not found" });
      }
    })
    .then(function () {
      res.status(200).json({ message: "utilisateur supprimé" })
    })
    .catch(function (err) {
      res.status(500).json({ err });
    });
};
