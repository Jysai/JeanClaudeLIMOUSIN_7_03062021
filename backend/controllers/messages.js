const models = require("../models");
const fs = require("fs");
const e = require("express");

exports.createMessage = function (req, res) {
  // Permet de créer un nouveau Post
  const content = req.body.content;

  models.User.findOne({
    where: { id: req.body.userId },
  })
    .then(function (userFound) {
      const model = {
        content: content,
        likes: 0,
        UserId: userFound.id,
      };
      if (req.file !== undefined) {
        model["imageUrl"] = `${req.protocol}://${req.get("host")}/public/${
          req.file.filename
        }`;
      }

      models.Message.create(model)
        .then(function (newMessage) {
          return res.status(201).json({
            newMessage,
          });
        })
        .catch(function (err) {
          return res.status(500).json({ err });
        });
    })
    .catch(function (err) {
      return res.status(500).json({ err });
    });
};

exports.deleteMessage = (req, res) => {
  // Permet de supprimer un Post
  models.User.findOne({
    where: { id: req.body.userId },
  })
    .then(function (userFound) {
      models.Message.findOne({
        where: { id: req.params.id },
      })
        .then(function (messageFound) {
          if (messageFound.imageUrl == null) {
            if (userFound.id == messageFound.UserId || userFound.id == 60) {
              messageFound
                .destroy()
                .then(function (messageDestroy) {
                  return res.status(200).json({
                    messageDestroy,
                  });
                })
                .catch(function (err) {
                  return res.status(500).json({ err });
                });
            } else {
              res.status(401).json({
                error: "vous n'avez pas les droits pour supprimer ce message",
              });
            }
          } else {
            if (userFound.id == messageFound.UserId || userFound.id == 60) {
              const filename = messageFound.imageUrl.split("/public/")[1];
              fs.unlink(`image/${filename}`, () => {
                messageFound
                  .destroy()
                  .then(function (messageDestroy) {
                    return res.status(200).json({
                      messageDestroy,
                    });
                  })
                  .catch(function (err) {
                    return res.status(500).json({ err });
                  });
              });
            } else {
              res.status(401).json({
                error: "vous n'avez pas les droits pour supprimer ce message",
              });
            }
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

exports.listMessages = (req, res, next) => {
  // liste tous les posts des utilisateurs
  models.Message.findAll({
    include: [
      {
        model: models.User,
        attributes: ["lastname", "firstname", "imageUrl"],
      },
    ],
    order: [["createdAt", "DESC"]],
  })
    .then(function (messages) {
      if (messages) {
        return res.status(200).json({ messages });
      } else {
        res.status(404).json({ error: "no messages found" });
      }
    })
    .catch((error) =>
      res.status(400).json({ message: "invalid fields", error })
    );
};

exports.addComment = async (req, res) => {
  // permet d'ajouter un commentaire sous un post
  try {
    const userId = req.body.userId;
    const messageId = req.params.id;
    const message = await models.Message.findOne({
      where: { id: messageId },
    });
    if (message) {
      await models.Comment.create({
        userId: userId,
        messageId: messageId,
        content: req.body.content,
      });
      res.status(201).send({ Message: "commentaire créé" });
    } else {
      res.status(404).send({ err: "Impossible de créer un commentaire" });
    }
  } catch (err) {
    return res.status(500).send({ err });
  }
};

exports.deleteMessage = (req, res) => {
  // Permet de supprimer un Post
  models.User.findOne({
    where: { id: req.body.userId },
  })
    .then(function (userFound) {
      models.Message.findOne({
        where: { id: req.params.id },
      })
        .then(function (messageFound) {
          if (userFound.id == messageFound.UserId || userFound.id == 60) {
            if (messageFound.imageUrl == null) {
              messageFound.destroy().then(function () {
                return res.status(200).json({ msg: "Message supprimé" });
              });
            } else {
              const filename = messageFound.imageUrl.split("/public/")[1];
              fs.unlink(`image/${filename}`, () => {
                messageFound.destroy().then(function () {
                  return res.status(200).json({ msg: "Message supprimé" });
                });
              });
            }
          } else {
            return res.status(401).json({
              error: "Vous ne pouvez pas supprimer ce message",
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

exports.deleteComment = (req, res) => {
  // supprime un commentaire
  models.User.findOne({
    where: { id: req.body.userId },
  })
    .then(function (userFound) {
      models.Comment.findOne({
        where: { id: req.params.id },
      })
        .then(function (commentFound) {
          if (userFound.id == commentFound.UserId || userFound.id == 60) {
            commentFound.destroy().then(function () {
              return res.status(200).json({ message: "Commentaire supprimé" });
            });
          } else {
            return res.status(401).json({
              error: "Vous ne pouvez pas supprimer ce commentaire",
            });
          }
        })
        .catch(function (err) {
          res.status(404).json({
            error: "commentaire non trouvé",
          });
        });
    })
    .catch(function (error) {
      res.status(404).json({ error: "Utilisateur non trouvé" });
    });
};



exports.likeMessage = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const messageId = req.params.id;
    const user = await models.Like.findOne({
      where: { userId: userId, messageId: messageId },
    });
    if (user) {
      await models.Like.destroy(
        { where: { userId: userId, messageId: messageId } },
        { truncate: true, restartIdentity: true }
      );

      res.status(200).send({ message: "vous n'aimez plus ce Message" });
      try {
        models.Message.findOne({
          where: { id: messageId },
        }).then(function (messageFound) {
          messageFound.update({
            likes: messageFound.likes - 1,
          });
        });
      } catch (err) {
        return res.status(404).send({ err });
      }
    } else {
      await models.Like.create({
        userId: userId,
        messageId: messageId,
      });
      res.status(201).json({ message: "vous aimez ce Message" });
      try {
        models.Message.findOne({
          where: { id: messageId },
        }).then(function (messageFound) {
          messageFound.update({
            likes: messageFound.likes + 1,
          });
        });
      } catch (err) {
        return res.status(404).send({ err });
      }
    }
  } catch (err) {
    return res.status(500).send({ err });
  }
};

exports.listComments = (req, res, next) => {
  // liste tous les commentaires
  models.Comment.findAll({
    include: [
      {
        model: models.User,
        attributes: ["lastname", "firstname"],
      },
    ],
    order: [["createdAt", "DESC"]],
  })
    .then(function (comments) {
      return res.status(201).json({ comments });
    })
    .catch(function (err) {
      return res.status(404).json({ error: "no comments found" });
    });
};
