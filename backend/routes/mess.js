const express = require('express')
const router = express.Router();
const messageCtrl = require('../controllers/messages')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config');

router.post('/', auth, messageCtrl.createMessage)
router.get('/', multer,  messageCtrl.listMessages)
router.delete('/:id', auth, messageCtrl.deleteMessage)
router.get('/:id', multer,  messageCtrl.listMessages)
router.put('/:id', multer, auth, messageCtrl.editPost)
router.post('/:id/like', multer, auth, messageCtrl.likePost)

module.exports = router