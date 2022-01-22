const multer = require('multer');

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif"
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'image');
  },
  filename: (req, files, callback) => {
    const name = files.originalname.split(' ', 'jpg', 'jpeg', 'png', 'webp', 'gif').join('_'); 
    const extension = MIME_TYPES[files.mimetype]; 
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');


