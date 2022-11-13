
const router = require("express").Router()
const loadMessagesController = require('../controllers/loadMessagesController' )
const verifyJWT = require('../middlewares/verifyJWT')
router.get("/", verifyJWT, loadMessagesController)




module.exports = router