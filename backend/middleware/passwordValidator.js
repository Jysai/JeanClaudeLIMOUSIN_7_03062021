const passwordSchema = require('../utils/password');

exports.passwordValidator = (req, res, next) => {
    //Si le format du mot de passe ne correspond au model pas, on renvoie une erreur
    if (!passwordSchema.validate(req.body.password)) {
        res.status(400).json({ message: 'Le mot de passe doit comporter au minimum 8 caractères, une majuscule, une minuscule et 2 chiffres.' });
    } else {
        next();
    }
};