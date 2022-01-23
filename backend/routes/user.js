const express = require('express')
const router = express.Router();
const userCtrl = require('../controllers/user')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config');
const passwordCtrl = require("../middleware/passwordValidator")

router.post('/signup', passwordCtrl.passwordValidator, userCtrl.signup)
router.post('/login', userCtrl.login)

router.get('/me', auth,  userCtrl.me)
router.get('/allUsers', auth,  userCtrl.allUsers)

router.put('/editLastname', auth, userCtrl.updateUserLastname)
router.put('/editFirstname', auth, userCtrl.updateUserFirstname)
router.put('/editAvatar', multer, auth, userCtrl.editAvatar)



router.delete('/', auth, userCtrl.deleteProfile)



module.exports = router