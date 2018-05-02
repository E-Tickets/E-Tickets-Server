const mysqlUtils = require('../utils/mysql_utils');

const schedule = {
    async createSchedule(cinemaId, hallId, time, movieId, price) {
        let _sql = `INSERT INTO movie_schedule
                    (cinema_id, hall_id, time, movie_id, price)
                    VALUES(?, ?, ?, ?, ?);`;
        let values = [cinemaId, hallId, time, movieId, price];

        let res = await mysqlUtils.mysqlQuery(_sql, values);

        return res.insertId;
    },

    async getScheduleInfo(scheduleId) {
        let _sql = `SELECT *
                    FROM movie_schedule
                    WHERE schedule_id=?;`;
        let values = [scheduleId];

        let res = await mysqlUtils.mysqlQuery(_sql, values);

        return res;
    },

    async searchScheduleByCinemaId(cinemaId, timeBegin, timeEnd) {
        let _sql = `SELECT *
                    FROM movie_schedule
                    WHERE cinema_id=? and (time>=? and time<=?)
                    ORDER BY movie_id, time;`;
        let values = [cinemaId, timeBegin, timeEnd];

        let res = await mysqlUtils.mysqlQuery(_sql, values);

        return res;
    },

    async searchScheduleByMovieId(movieId, timeBegin, timeEnd) {
        let _sql = `SELECT *
                    FROM movie_schedule
                    WHERE movie_id=? and (time>=? and time <=?)
                    ORDER BY cinema_id, time;`;
        let values = [movieId, timeBegin, timeEnd];

        let res = await mysqlUtils.mysqlQuery(_sql, values);

        return res;
    },

    async searchScheduleByMovieIdLocation(movieId, 
            location, timeBegin, timeEnd) {
        let _sql = `SELECT *
                    FROM movie_schedule
                    WHERE movie_id=? 
                          and (time>=? and time<=?) 
                          and cinema_id IN (SELECT cinema_id
                                            FROM cinema
                                            WHERE cinema_location=?)
                    ORDER BY cinema_id, time;`;
        let values = [movieId, timeBegin, timeEnd, location];

        let res = await mysqlUtils.mysqlQuery(_sql, values);

        return res;
    },

    async deleteScheduleById(scheduleId) {
        let _sql = `DELETE FROM movie_schedule
                    WHERE schedule_id=?;`;
        let values = [scheduleId];

        await mysqlUtils.mysqlQuery(_sql, values);
    }
};

module.exports = schedule;