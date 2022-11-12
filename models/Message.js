const mongoose = require('mongoose')


const MessageSchema = new mongoose.Schema({
    name: {
        type:String
    },
    message: {
        type:String, 
    },
    profilePicture: {
        type:String
    }
})


const Message = mongoose.model("Message", MessageSchema)

module.exports = Message