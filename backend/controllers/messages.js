const models = require("../models");

exports.createMessage = function (req, res) {
  
  const content = req.body.content;
  // if (content == null) {
  //   return res.status(400).json({ err: "missing parameters" });
  // }

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
            res.status(200).json({ message: "message supprimé !" });
          } else {
            res.status(401).json({
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

exports.editMessage = (req, res, next) => {
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
            res.status(401).json({
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

exports.listMessages = (req, res, next) => {
  models.Message.findAll({
    include: [
      {
        model: models.User,
        attributes: ["lastname", "firstname"],
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

exports.deleteComment = (req, res) => {
  models.User.findOne({
    where: { id: req.body.userId },
  })
    .then(function (userFound) {
      models.Comment.findOne({
        where: { id: req.params.id },
      })
        .then(function (commentFound) {
          if (userFound.id == commentFound.UserId) {
            commentFound.destroy();
            res.status(200).json({ error: "commentaire supprimé !" });
          } else {
            res.status(401).json({
              error: "vous n'avez pas les droits pour supprimer ce message",
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
      await models.Like.destroy({
        where: { userId: userId, messageId: messageId },
      });
      res.status(201).send({ Message: "vous n'aimez plus ce Message" });
      try {
        const messageFound = await models.Message.findOne({
          where: { id: messageId },
        });
        if (messageFound) {
          messageFound.update({
            likes: messageFound.likes - 1,
          });
        }
      } catch (err) {
        return res.status(500).send({ err });
      }
    } else {
      await models.Like.create({
        userId: userId,
        messageId: messageId,
      });
      res.status(201).json({ Message: "vous aimez ce Message" });
      try {
        const messageFound = await models.Message.findOne({
          where: { id: messageId },
        });
        if (messageFound) {
          messageFound.update({
            likes: messageFound.likes + 1,
          });
        }
      } catch (err) {
        return res.status(500).send({ err });
      }
    }
  } catch (err) {
    return res.status(500).send({ err });
  }
};

exports.listComments = (req, res, next) => {
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
      return res.status(200).json({ comments });
    })
    .catch(function (err) {
      return res.status(404).json({ error: "no comments found" });
    });
};
