const router = require('koa-router')();

const adminController = require('../controllers/admin');

router.post('/', adminController.register);

module.exports = router;