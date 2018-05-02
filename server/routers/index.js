const router = require('koa-router')();

const user = require('./user');
const admin = require('./admin');
const owner = require('./cinema_owner');

const session = require('./session');

const movie = require('./movie');
const movies = require('./movies');
const cinema = require('./cinema');
const cinemas = require('./cinemas');
const schedule = require('./schedule');
const schedules = require('./schedules');

router.use('/api/user', user.routes());
router.use('/api/admin', admin.routes());
router.use('/api/owner', owner.routes());

router.use('/api/session', session.routes());

router.use('/api/movie', movie.routes());
router.use('/api/movies', movies.routes());
router.use('/api/cinema', cinema.routes());
router.use('/api/cinemas', cinemas.routes());
router.use('/api/schedule', schedule.routes());
router.use('/api/schedules', schedules.routes());

module.exports = router;