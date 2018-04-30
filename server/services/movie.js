const movieModel = require('../models/movie');

const formattingDbData = (moviesInfoOrig) => {
    return moviesInfoOrig.map((movie) => {
        return {
            'title': movie.title,
            'poster': movie.poster,
            'director': movie.director,
            'actors': movie.actors.split('#'),
            'tags': movie.tags.split('#')
        }
    });
};

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
    },

    async searchMovies(keyWord) {
        let res = {};
        let moviesInfo = [];

        let moviesByTitle = await movieModel.searchMoviesByTitle(keyWord);
        moviesInfo = moviesInfo.concat(moviesByTitle);

        let moviesByDirector = await movieModel.searchMoviesByDirector(keyWord);
        moviesInfo = moviesInfo.concat(moviesByDirector);

        let moviesByActor = await movieModel.searchMoviesByActor(keyWord);
        moviesInfo = moviesInfo.concat(moviesByActor);

        let moviesByTag = await movieModel.searchMoviesByTag(keyWord);
        moviesInfo = moviesInfo.concat(moviesByTag);

        moviesInfo = formattingDbData(moviesInfo);

        if (moviesInfo.length > 0) {
            res.status = 'OK';
            res.message = 'Find movies.';
            res.data = {
                'movies': moviesInfo
            };
        } else {
            res.status = 'NOT_FOUND';
            res.message = 'Cannot find any movie.';
            res.data = {};
        }

        return res;
    },

    async searchMoviesByTitle(titleKey) {
        let res = {};
        let moviesInfo = await movieModel.searchMoviesByTitle(titleKey);
        moviesInfo = formattingDbData(moviesInfo);

        if (moviesInfo.length > 0) {
            res.status = 'OK';
            res.message = 'Find movies. Search by title.';
            res.data = {
                'movies': moviesInfo
            };
        } else {
            res.status = 'NOT_FOUND';
            res.message = 'Cannot find any movie.';
            res.data = {};
        }

        return res;
    },

    async searchMoviesByDirector(directorKey) {
        let res = {};
        let moviesInfo = await movieModel.searchMoviesByDirector(directorKey);
        moviesInfo = formattingDbData(moviesInfo);

        if (moviesInfo.length > 0) {
            res.status = 'OK';
            res.message = 'Find movies. Search by director.';
            res.data = {
                'movies': moviesInfo
            };
        } else {
            res.status = 'NOT_FOUND';
            res.message = 'Cannot find any movie.';
            res.data = {};
        }

        return res;
    },

    async searchMoviesByActor(actorKey) {
        let res = {};
        let moviesInfo = await movieModel.searchMoviesByActor(actorKey);
        moviesInfo = formattingDbData(moviesInfo);

        if (moviesInfo.length > 0) {
            res.status = 'OK';
            res.message = 'Find movies. Search by actor.';
            res.data = {
                'movies': moviesInfo
            };
        } else {
            res.status = 'NOT_FOUND';
            res.message = 'Cannot find any movie.';
            res.data = {};
        }

        return res;
    },

    async searchMoviesByTag(tagKey) {
        let res = {};
        let moviesInfo = await movieModel.searchMoviesByTag(tagKey);
        moviesInfo = formattingDbData(moviesInfo);

        if (moviesInfo.length > 0) {
            res.status = 'OK';
            res.message = 'Find movies. Search by tag.';
            res.data = {
                'movies': moviesInfo
            };
        } else {
            res.status = 'NOT_FOUND';
            res.message = 'Cannot find any movie.';
            res.data = {};
        }

        return res;
    }
};

module.exports = movie;