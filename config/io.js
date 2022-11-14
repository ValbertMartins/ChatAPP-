const Message = require('../models/Message')
const User = require('../models/User')
const runIo = (server) => {
    const io = require('socket.io')(server);
    
    io.on("connection", (socket) => {
      
      
    
      socket.on("message", async data => {
        console.log(data)
        try {

          const user = await User.findOne({name:data.name}).select('-password')
  
            data.access = true
            await Message.create({ name:data.name , message:data.message , profilePicture:user.profilePicture})
            socket.broadcast.emit("receiveMessage" , data)

          
            
        }catch(error){
          console.log("error handling")
        }
      })
    
      
    });

}

module.exports = runIo