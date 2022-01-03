const express = require('express')
const router = express.Router();
const messageCtrl = require('../controllers/messages')
const auth = require('../middleware/auth')

router.post('/', auth, messageCtrl.createMessage)
router.get('/',  messageCtrl.listMessages)
router.delete('/:id', auth, messageCtrl.deleteMessage)
router.put('/:id', auth, messageCtrl.editPost)

module.exports = router