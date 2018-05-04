const router = require('koa-router')();
const orderController = require('../controllers/order');

router.get('/:username/paidorders', 
        orderController.searchPaidOrderByUser);

router.get('/:username/unpaidorders',
        orderController.searchUnpaidOrderByUser);

module.exports = router;