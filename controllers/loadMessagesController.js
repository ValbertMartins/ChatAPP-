const User = require('../models/User')
const Message = require('../models/Message')

const loadMessagesController = async (req,res) => {

    try {
        const listMessages = await Message.find({})
        res.status(201).json(listMessages)
    }catch(error){
        console.log(error)
        res.status(400).json({"message":"error to load messages"})
    }
   

}

module.exports = loadMessagesController