const express = require('express')
const router = express.Router();
const userCtrl = require('../controllers/user')
const auth = require('../middleware/auth')

router.post('/signup', userCtrl.signup)
router.post('/login', userCtrl.login)

router.get('/me', auth,  userCtrl.me)
router.get('/allUsers', auth,  userCtrl.allUsers)
router.put('/', auth, userCtrl.updateUserProfile)
router.delete('/', auth, userCtrl.deleteProfile)



module.exports = router