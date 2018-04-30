const router = require('koa-router')();

const sessionController = require('../controllers/session');

router.post('/user', sessionController.userLogIn);
router.del('/user', sessionController.userLogOut);

router.post('/admin', sessionController.adminLogIn);
router.del('/admin', sessionController.adminLogOut);

module.exports = router;