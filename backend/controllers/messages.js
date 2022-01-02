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
  models.Message.findOne({ _id: req.params.id })
  .then((message) => {
    console.log(message);
  })
  .catch(function (err) {
    res.status(500).json({ error: "cannot fetch user" });
  });
};

  



exports.deleteMessage = (req, res, next) => {
  const saucedId = req.params.id;
  console.log(req.params.id);

  models.Message.findOne({ _id: saucedId }) //On récupère la sauce
    .then((sauce) => {
      Sauce.dextroy({ _id: saucedId }) // la méthode deleteOne permet de supprimer l'objet dans la base
        .then(() => res.status(200).json({ message: "Objet supprimé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
