const Message = require('../models/Message')
const User = require('../models/User')
const runIo = (server) => {
    const io = require('socket.io')(server);
    
    io.on("connection", (socket) => {
      
      
    
      socket.on("message", async data => {


        const { profilePicture } = await User.findOne({name:data.name}).select('-password')

        await Message.create({ name:data.name , message:data.message , profilePicture})

        socket.broadcast.emit("receiveMessage" , data)
      })
    
      
    });

}

module.exports = runIo