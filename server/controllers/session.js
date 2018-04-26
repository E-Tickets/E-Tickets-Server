const bodyParser = require('koa-bodyparser');

const userService = require('../services/user');
const httpStatus = require('../utils/res_status_utils');

const session = {
    async logIn(ctx) {
        let username = ctx.request.body.username;
        let password = ctx.request.body.password;

        let res = await userService.verifyUser(username, password);

        let httpStatusCode = httpStatus[res.status];
        
        if (httpStatusCode === 200) {
            ctx.session.username = username;
        }

        ctx.response.status = httpStatusCode;
        ctx.response.body = res;
    },

    async logOut(ctx) {
        delete ctx.session.username;

        ctx.response.status = 200;
        ctx.response.body = {
            'status': 'OK',
            'message': 'Log out successfully.',
            'data': {}
        };
    }
};

module.exports = session;