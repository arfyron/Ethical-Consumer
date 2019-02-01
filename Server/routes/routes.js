const router = require('express').Router();
const controller = require('../controllers/controller.js')

router.get('/execs/:ticker', controller.getExecs);
router.get('/donations/:name', controller.getDonations)

module.exports = router;
