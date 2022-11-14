const User = require('../models/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const loginController = async (req,res) => {
    const { name , password } = req.body
    
    try {
        const user = await User.findOne({name})
        if(!user){
            return res.status(401).json({"message": "user or password doesn't exists"})
        }

        const correctPassword = await bcrypt.compare(password, user.password)

        if(!correctPassword){
            return res.status(401).json({"message": "user or password doesn't exists"})
        }

        const accessToken = jwt.sign({ userId: user._id}, process.env.SECRET ,{ expiresIn: '10s'})


        res.status(201).json({"message":"loggin successful", user :user.name, accessToken})
        
    }catch(error){
        console.log(error)
        res.status(400).json({"message": "error to auth"})
    }
}

module.exports = loginController