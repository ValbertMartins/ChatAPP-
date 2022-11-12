const loginController = require('../controllers/loginController');
const router = require('express').Router();

router.post('/', loginController)


module.exports = router