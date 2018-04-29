const router = require('koa-router')();

const movieController = require('../controllers/movie');

router.post('/', movieController.createMovie);

module.exports = router;