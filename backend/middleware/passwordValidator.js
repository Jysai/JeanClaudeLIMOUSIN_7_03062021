const passwordSchema = require('../utils/password');
//On fait passer le mot de passe fourni au validateur
exports.passwordValidator = (req, res, next) => {
    //Si le mot de passe ne satisfait pas, on renvoie une erreur
    if (!passwordSchema.validate(req.body.password)) {
        res.status(400).json({ message: 'Le mot de passe doit comporter au minimum 8 caractères, une majuscule, une minuscule et 2 chiffres.' });
    } else {
        next();
    }
};