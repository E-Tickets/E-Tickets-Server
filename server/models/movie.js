const mysqlUtils = require('../utils/mysql_utils');

const movieUtils = {
    mergeStrArray(strArray) {
        let strMerge = '';

        for (let str of strArray) {
            strMerge += str;
            strMerge += '#';
        }
        strMerge = strMerge.substr(0, strMerge.length - 1);

        return strMerge;
    },

    async insertMovieDb(title, poster, director, actors, tags) {
        let strTags = this.mergeStrArray(tags);
        let strActors = this.mergeStrArray(actors);

        let _sql = `INSERT INTO movie(title, poster, director, actors, tags)
                    VALUES(?, ?, ?, ?, ?);`;
        let values = [title, poster, director, strActors, strTags];

        await mysqlUtils.mysqlQuery(_sql, values);
    },

    async insertTagDb(tags) {
        let _sql = `INSERT IGNORE INTO tag(tag_name)
                    VALUES(?);`;
        for (let tag of tags) {
            let values = [tag];

            await mysqlUtils.mysqlQuery(_sql, values);
        }
    },

    async insertDirectorDb(director) {
        let _sql = `INSERT IGNORE INTO director(director_name)
                    VALUES(?);`; 
        let values = [director];

        await mysqlUtils.mysqlQuery(_sql, values);
    },

    async insertActorDb(actors) {
        let _sql = `INSERT IGNORE INTO actor(actor_name)
                    VALUES(?);`;
        for (let actor of actors) {
            let values = [actor];

            await mysqlUtils.mysqlQuery(_sql, values);
        }
    },

    async getLatestInsertMovieId() {
        let _sql = `SELECT MAX(movie_id) as movie_id FROM movie;`;

        let res = await mysqlUtils.mysqlQuery(_sql);

        console.log(res[0]);
        return res[0].movie_id;
    },

    async mapMovieTags(movie_id, tags) {
        try {
            for (let tag of tags) {
                let _sql = `SELECT tag_id FROM tag
                            WHERE tag_name=?;`;
                let values = [tag];
                let res = await mysqlUtils.mysqlQuery(_sql, values);
                let tag_id = res[0].tag_id;

                _sql = `INSERT INTO tag_movie_map(tag_id, movie_id)
                        VALUES(?, ?)`;
                values = [tag_id, movie_id];
                
                await mysqlUtils.mysqlQuery(_sql, values);
            }
        } catch(err) {
            throw err;
        }
    },

    async mapMovieDirector(movie_id, director) {
        try {
            let _sql = `SELECT director_id FROM director
                        WHERE director_name=?;`;
            let values = [director];
            let res = await mysqlUtils.mysqlQuery(_sql, values);
            let director_id = res[0].director_id;

            _sql = `INSERT INTO director_movie_map(director_id, movie_id)
                    VALUES(?, ?)`;
            values = [director_id, movie_id];

            await mysqlUtils.mysqlQuery(_sql, values);
        } catch(err) {
            throw err;
        }
    },

    async mapMovieActors(movie_id, actors) {
        try {
            for (let actor of actors) {
                let _sql = `SELECT actor_id FROM actor
                            WHERE actor_name=?;`;
                let values = [actor];
                let res = await mysqlUtils.mysqlQuery(_sql, values);
                let actor_id = res[0].actor_id;

                _sql = `INSERT INTO actor_movie_map(actor_id, movie_id)
                        VALUES(?, ?)`;
                values = [actor_id, movie_id];
                
                await mysqlUtils.mysqlQuery(_sql, values);
            }
        } catch(err) {
            throw err;
        }
    }
};

const movie = {
    async create(movie_title, poster, 
                director, actors, tags) {
        await mysqlUtils.mysqlQuery(`BEGIN;`);

        try {
            await movieUtils.insertMovieDb(movie_title, poster, director, actors, tags);
            let movie_id = await movieUtils.getLatestInsertMovieId();

            await movieUtils.insertTagDb(tags);
            await movieUtils.mapMovieTags(movie_id, tags);

            await movieUtils.insertDirectorDb(director);
            await movieUtils.mapMovieDirector(movie_id, director);

            await movieUtils.insertActorDb(actors);
            await movieUtils.mapMovieActors(movie_id, actors);

            await mysqlUtils.mysqlQuery(`COMMIT;`);
        } catch(err) {
            console.log(`Database ROLLBACK!!`);
            await mysqlUtils.mysqlQuery(`ROLLBACK;`);
            throw err;
        }
    }
};

module.exports = movie;