const router = require('koa-router')();
const orderController = require('../controllers/order');

router.get('/:username/paidorder', 
        orderController.searchPaidOrderByUser);

router.get('/:username/unpaidorder',
        orderController.searchUnpaidOrderByUser);

module.exports = router;