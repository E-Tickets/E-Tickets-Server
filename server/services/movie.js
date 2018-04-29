const movieModel = require('../models/movie');

const movie = {
    async createMovie(movie_title, 
                poster='/images/poster/default.png', 
                director, actors, tags) {
        let res = {};
        try {
            await movieModel.create(movie_title, 
                    poster, director, actors, tags);
            res.status = 'OK';
            res.message = 'Create movie successfully.';
            res.data = {
                'movie_title': movie_title,
                'poster': poster,
                'director': director,
                'actors': actors,
                'tags': tags
            };
        } catch(err) {
            res.status = 'INTERNAL_ERROR';
            res.message = 'Cannot create this movie.';
            res.data = {};
        }

        return res;
    }
};

module.exports = movie;