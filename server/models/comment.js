const mysqlUtils = require('../utils/mysql_utils');

const comment = {
    async createComment(username, movieId, 
            isRecommended, commentContent, isSpoiled) {
        let _sql = `INSERT INTO comment
                    (username, movie_id, is_recommended, comment_content, is_spoiled)
                    VALUES(?, ?, ?, ?, ?);`;
        let values = [username, movieId, isRecommended, commentContent, isSpoiled];

        await mysqlUtils.mysqlQuery(_sql, values);
    },

    async deleteComment(username, movieId) {
        let _sql = `DELETE FROM comment
                    WHERE username=? and movie_id=?;`;
        let values = [username, movieId];

        await mysqlUtils.mysqlQuery(_sql, values);
    },

    async deleteCommentById(commentId) {
        let _sql = `DELETE FROM comment
                    WHERE comment_id=?;`;
        let values = [commentId];

        await mysqlUtils.mysqlQuery(_sql, values);
    },

    async searchCommentsByMovieId(movieId) {
        let _sql = `SELECT * FROM comment
                    WHERE movie_id=?;`;
        let values = [movieId];

        let res = await mysqlUtils.mysqlQuery(_sql, values);

        return res;
    },

    async getCommentsNumByMovieId(movieId) {
        let _sql = `SELECT COUNT(movie_id) AS amount
                    FROM comment
                    WHERE movie_id=?;`;
        let values = [movieId];

        let res = await mysqlUtils.mysqlQuery(_sql, values);

        return res;
    },

    async searchCommentsByMovieIdPage(movieId, pageId, pageNum) {
        let _sql = `SELECT * FROM comment
                    INNER JOIN (
                        SELECT comment_id FROM comment
                        WHERE movie_id=?
                        ORDER BY time LIMIT ?, ?
                    ) AS page USING(comment_id);`;
        let recordsStart = (pageId - 1) * pageNum;
        let values = [movieId, recordsStart, pageNum];

        let res = await mysqlUtils.mysqlQuery(_sql, values);

        return res;
    },

    async searchCommentsByUser(username) {
        let _sql = `SELECT * FROM comment
                    WHERE username=?;`;
        let values = [username];

        let res = await mysqlUtils.mysqlQuery(_sql, values);

        return res;
    },

    async getCommentsNumByUser(username) {
        let _sql = `SELECT COUNT(comment_id) AS amount
                    FROM comment
                    WHERE username=?;`;
        let values = [username];

        let res = mysqlUtils.mysqlQuery(_sql, values);

        return res;
    },

    async searchCommentsByUserPage(username, pageId, pageNum) {
        let _sql = `SELECT * FROM comment
                    INNER JOIN (
                        SELECT comment_id FROM comment
                        WHERE username=?
                        ORDER BY time LIMIT ?, ?
                    ) AS page USING(comment_id);`;
        let recordsStart = (pageId - 1) * pageNum;
        let values = [username, recordsStart, pageNum];

        let res = mysqlUtils.mysqlQuery(_sql, values);

        return res;
    }
 };

module.exports = comment;