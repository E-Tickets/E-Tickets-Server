const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const config = require('./config');
const router = require('./routers');

const app = new Koa();

app.use(bodyParser());
app.use(router.routes());

app.listen(config.port);
console.log(`Server start at port： ${config.port}`);