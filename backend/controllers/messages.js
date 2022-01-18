const models = require("../models");

exports.createMessage = function (req, res) {
  // console.log(req.body.userId);
  const content = req.body.content;
  // if (content == null) {
  //   return res.status(400).json({ err: "missing parameters" });
  // }
  models.User.findOne({
    where: { id: req.body.userId },
  })
    .then(function (userFound) {
      models.Message.create({
        content: content,
        likes: 0,
        // imageUrl: `${req.protocol}://${req.get('host')}/public/${
        //   req.files.image.name
        // }`,
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
    })
    .catch(function (err) {
      return res.status(500).json({ err });
    });
};

exports.editMessage = (req, res, next) => {
  const id = req.params.id;
  const userId = req.body.userId;

  let updatedPost = {
    content: req.body.content,
  };

  models.Message.update(updatedPost, {
    where: { id: id, userId: userId },
  }).then(() => res.status(200).json({ message: "Post modifié avec succès" }));
};

exports.deleteMessage = (req, res) => {
  models.User.findOne({
    where: { id: req.body.userId },
  })
    .then(function (userFound) {
      console.log(userFound);
      models.Message.findOne({
        where: { id: req.params.id },
      })
        .then(function (messageFound) {
          console.log(messageFound);
          if (userFound.id == messageFound.UserId) {
            messageFound.destroy();
            res.status(200).json({ error: "message supprimé !" });
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

exports.listMessages = (req, res, next) => {
  models.Message.findAll({
    // include: [
    //   {
    //     model: models.User,
    //     attributes: ["lastname", "firstname"],
    //   },
    // ],
    // order: [["createdAt", "DESC"]],
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

exports.addComment = (req, res) => {
  const comment = {
    content: req.body.content,
    messageId: req.params.id,
    userId: req.body.userId,
  };
  models.Comment.create(comment)
    .then(() => res.status(201).json({ message: "commentaire créé" }))
    .catch((error) =>
      res
        .status(400)
        .json({ message: "Impossible de créer un commentaire", error })
    );
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
      // try {
      //   const messageFound = await models.Message.findOne({
      //     where: { id: messageId },
      //   });
      //   if (messageFound) {
      //     messageFound.update({
      //       likes: messageFound.likes - 1,
      //     });
      //   }
      // } catch (err) {
      //   return res.status(500).send({ err });
      // }
    } else {
      await models.Like.create({
        userId: userId,
        messageId: messageId,
      });
      res.status(201).json({ Message: "vous aimez ce Message" });
      // try {
      //   const messageFound = await models.Message.findOne({
      //     where: { id: messageId },
      //   });
      //   if (messageFound) {
      //     messageFound.update({
      //       likes: messageFound.likes + 1,
      //     });
      //   }
      // } catch (err) {
      //   return res.status(500).send({ err });
      // }
    }
  } catch (err) {
    return res.status(500).send({ err });
  }
};

exports.listComments = (req, res, next) => {
  // models.Comment.findAll({
  //   include: [
  //     {
  //       model: models.User,
  //       attributes: ["lastname", "firstname"],
  //     },
  //   ],
  //   order: [["createdAt", "DESC"]],
  // })
  //   .then(function (comments) {
  //     if (comments) {
  //       return res.status(200).json({ comments });
  //     } else {
  //       res.status(404).json({ error: "no comments found" });
  //     }
  //   })
  //   .catch(function (err) {
  //     console.log(err);
  //     res.status(500).json({ error: "invalid fields" });
  //   });
};
