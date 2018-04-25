const router = require('koa-router')();

const users = require('./users');

router.use('/api/users', users.routes());

module.exports = router;