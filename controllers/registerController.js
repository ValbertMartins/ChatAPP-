const User = require('../models/User')
const bcrypt = require('bcrypt')
const registerController = async (req,res) => {
   const { name , password } = req.body

    if(!name || !password) {
       return res.status(204).json({"message": "user and password is required"})
    }
    
    try {
        const userAlreadyExists = await User.findOne({name});

        if(userAlreadyExists){
            return res.status(200).json({"message":"user already exists"})
        }

        const passwordHashed = await bcrypt.hash(password, 10)
        await User.create({name,password:passwordHashed})
        res.status(201).json({"message": "created user successful"})
    } catch(error){
        console.log(error)
        res.status(400).json({"message":"error to create user"})
    }

}

module.exports = registerController