const router = require('koa-router')();

const ownerController = require('../controllers/cinema_owner');

router.post('/', ownerController.register);

module.exports = router;