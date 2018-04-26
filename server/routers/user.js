const router = require('koa-router')();

const userController = require('../controllers/user');

router.post('/', userController.register);

router.get('/:username', userController.queryUserInfo);
router.put('/:username', userController.updateUserInfo);


module.exports = router;