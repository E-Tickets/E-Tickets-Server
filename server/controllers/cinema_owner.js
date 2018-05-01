const bodyParser = require('koa-bodyparser');

const ownerService = require('../services/cinema_owner');
const httpStatus = require('../utils/res_status_utils');

const owner = {
    async register(ctx) {
        let username = ctx.request.body.username || '';
        let password = ctx.request.body.password || '';

        let res = await ownerService.register(username, password);
        
        let httpStatusCode = httpStatus[res.status];
        ctx.response.status = httpStatusCode;
        ctx.response.body = res;
    }
};

module.exports = owner;