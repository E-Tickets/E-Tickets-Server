const router = require('koa-router')();

const user = require('./user');
const admin = require('./admin');
const session = require('./session');

router.use('/api/user', user.routes());
router.use('/api/admin', admin.routes());
router.use('/api/session', session.routes());

module.exports = router;