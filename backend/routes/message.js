const express = require('express')
const router = express.Router();
const messageCtrl = require('../controllers/messages')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config');

router.post('/',auth, multer, messageCtrl.createMessage);
router.get('/', auth, messageCtrl.listMessages)
router.delete('/:id', auth, messageCtrl.deleteMessage)
router.put('/:id', auth, messageCtrl.editMessage)
router.post('/:id/like', auth,  messageCtrl.likeMessage)
router.post('/:id/comment', auth,  messageCtrl.addComment)
router.get('/comment', auth,  messageCtrl.listComments)
module.exports = router