const express = require('express')
const router = express.Router();
const messageCtrl = require('../controllers/messages')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config');

router.post('/', auth, messageCtrl.createMessage)
router.get('/', multer,  messageCtrl.listMessages)
router.delete('/:id', auth, messageCtrl.deleteMessage)
router.put('/:id', multer, auth, messageCtrl.editPost)

module.exports = router