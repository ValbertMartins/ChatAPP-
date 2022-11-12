
const router = require("express").Router()
const loadMessagesController = require('../controllers/loadMessagesController' )

router.get("/", loadMessagesController)


module.exports = router

