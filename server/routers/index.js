const router = require('koa-router')();

const user = require('./user');
const session = require('./session');

router.use('/api/user', user.routes());
router.use('/api/session', session.routes());

module.exports = router;