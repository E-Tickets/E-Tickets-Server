const router = require('koa-router')();

const commentController = require('../controllers/comment');

router.get('/allcomments/:movie_id', 
        commentController.searchAllCommentsByMovieId);

router.get('/allcomments/:movie_id/page/:page_id/pageamount/:page_num',
        commentController.searchAllCommentsByMovieIdPage);

router.get('/unspoiledcomments/:movie_id',
        commentController.searchUnspoiledCommentsByMovieId);

router.get('/unspoiledcomments/:movie_id/page/:page_id/pageamount/:page_num',
        commentController.searchUnspoiledCommentsByMovieIdPage);

router.get('/user/:username',
        commentController.searchCommentsByUser);

router.get('/user/:username/page/:page_id/pageamount/:page_num',
        commentController.searchCommentsByUserPage);

router.get('/allcomments/:movie_id/amount',
        commentController.getAllCommentsNumByMovieId);

router.get('/unspoiledcomments/:movie_id/amount',
        commentController.getUnspoiledCommentsNumByMovieId);

router.get('/user/:username/amount',
        commentController.getCommentsNumByUser);

module.exports = router;