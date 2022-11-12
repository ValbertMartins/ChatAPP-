const router = require('express').Router();
const profileController = require('../controllers/profileController')
const verifyJWT = require('../middlewares/verifyJWT')

router.get('/', verifyJWT , profileController)

module.exports = router