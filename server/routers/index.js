const router = require('koa-router')();

const user = require('./user');
const admin = require('./admin');
const session = require('./session');
const movie = require('./movie');
const movies = require('./movies');

router.use('/api/user', user.routes());
router.use('/api/admin', admin.routes());
router.use('/api/session', session.routes());
router.use('/api/movie', movie.routes());
router.use('/api/movies', movies.routes());

module.exports = router;