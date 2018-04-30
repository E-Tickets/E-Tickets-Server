const router = require('koa-router')();
const multer = require('koa-multer');

const uploadUtils = require('../utils/upload_utils');
const movieController = require('../controllers/movie');

const upload = multer({
    storage: uploadUtils.posterEngine
});

router.post('/', movieController.createMovie);

router.post('/poster', upload.single('poster'), 
        movieController.uploadPoster);

module.exports = router;