const movieService = require('../services/movie');
const httpStatus = require('../utils/res_status_utils');

const movie = {
    async createMovie(ctx) {
        let movie_title = ctx.request.body.movie_title || '';
        let poster = ctx.request.body.poster || '';
        let director = ctx.request.body.director || '';
        let actors = ctx.request.body.actors;
        let tags = ctx.request.body.tags;

        if (!ctx.session.hasOwnProperty('idInfo')
            || ctx.session.idInfo.identity !== 'admin') {
            ctx.response.status = 401;
            ctx.response.body = {
                'status': 'UNAUTHORIZED',
                'message': 'Permission denied. You are not admin',
                'data': {}
            };
        } else {
            let res = await movieService.createMovie(movie_title, 
                    poster, director, actors, tags);
            
            let httpStatusCode = httpStatus[res.status];
            ctx.response.status = httpStatusCode;
            ctx.response.body = res;
        }
    }
};

module.exports = movie;