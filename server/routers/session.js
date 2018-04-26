const router = require('koa-router')();

const sessionController = require('../controllers/session');

router.post('/', sessionController.logIn);
router.del('/', sessionController.logOut);

module.exports = router;