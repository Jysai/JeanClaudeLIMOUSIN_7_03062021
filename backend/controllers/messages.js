const models = require("../models");

exports.createMessage = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;

  if (title == null || content == null) {
    return res.status(400).json({ err: "missing parameters" });
  }

  if (title.length <= 2 || content.length <= 4) {
    return res.status(400).json({ err: "invalid parameters" });
  }

  models.User.findOne({
    where: { id: req.body.userId },
  })
    .then(function (userFound) {
      if (userFound) {
        models.Message.create({
          title: title,
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
    const fields = req.query.fields;
    const limit = parseInt(req.query.fields);
    const offset = parseInt(req.query.offset);
    const order = req.query.order;
    models.Message.findAll({
    //   order: [order != null ? order.split(":") : ["title", "ASC"]],
    //   attributes: fields !== "*" && fields != null ? fields.split(",") : null,
    //   limit: !isNaN(limit) ? limit : null,
    //   offset: !isNaN(offset) ? offset : null,
      include: [
        {
          model: models.User,
          attributes: ["username"],
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
