const models = require("../models");

exports.createMessage = (req, res, next) => {
  const content = req.body.content;

  if (content == null) {
    return res.status(400).json({ err: "missing parameters" });
  }

  models.User.findOne({
    where: { id: req.body.userId },
  })
    .then(function (userFound) {
      if (userFound) {
        models.Message.create({
          content: content,
          likes: 0,
          UserId: userFound.id,
        })
          .then(function (newMessage) {
            return res.status(201).json({
              newMessage,
            });
          })
          .catch(function (err) {
            return res.status(500).json({ err });
          });
      } else {
        return res.status(409).json({ error: "utilisateur non trouvé" });
      }
    })
    .catch(function (err) {
      return res.status(500).json({ error: err });
    });
};

exports.listMessages = (req, res, next) => {
  models.Message.findAll({
    include: [
      {
        model: models.User,
        attributes: ["lastname", "firstname"],
      },
    ],
  })
    .then(function (messages) {
      if (messages) {
        return res.status(200).json({ messages });
      } else {
        res.status(404).json({ error: "no messages found" });
      }
    })
    .catch(function (err) {
      console.log(err);
      res.status(500).json({ error: "invalid fields" });
    });
};

exports.editPost = (req, res, next) => {
  models.User.findOne({
    where: { id: req.body.userId },
  })
    .then(function (userFound) {
      models.Message.findOne({
        where: { id: req.params.id },
      })
        .then(function (messageFound) {
          if (userFound.id == messageFound.UserId) {
            messageFound.update({
              content: req.body.content
                ? req.body.content
                : messageFound.content,
            });
            res.status(200).json({ error: "message modifié" });
          } else {
            res
              .status(401)
              .json({
                error: "vous n'avez pas les droits pour modifier ce message",
              });
          }
        })
        .catch(function (err) {
          res.status(404).json({
            error: "message non trouvé",
          });
        });
    })
    .catch(function (error) {
      res.status(404).json({ error: "Utilisateur non trouvé" });
    });
};

exports.deleteMessage = (req, res, next) => {
  models.User.findOne({
    where: { id: req.body.userId },
  })
    .then(function (userFound) {
      models.Message.findOne({
        where: { id: req.params.id },
      })
        .then(function (messageFound) {
          if (userFound.id == messageFound.UserId) {
            messageFound.destroy();
            res.status(200).json({ error: "message supprimé !" });
          } else {
            res
              .status(401)
              .json({
                error: "vous n'avez pas les droits pour supprimer ce message",
              });
          }
        })
        .catch(function (err) {
          res.status(404).json({
            error: "message non trouvé",
          });
        });
    })
    .catch(function (error) {
      res.status(404).json({ error: "Utilisateur non trouvé" });
    });
};
