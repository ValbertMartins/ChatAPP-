const User = require('../models/User')


const profileController = async (req,res) => {
   console.log(req.userId)
   try {
      const user = await User.findById(req.userId).select("-password -__v ")
      //const usersList = users.map( ({ _doc}) => _doc ).map(({password, ...rest}) => ({...rest}) )   
     res.status(201).json(user)
   }catch(error){
        console.log(error)
   }
    

}

module.exports = profileController