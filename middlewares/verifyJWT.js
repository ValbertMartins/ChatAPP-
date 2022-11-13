const jwt = require('jsonwebtoken')
require('dotenv').config()


const verifyJWT = async (req,res,next) => {
    
    const authHeader = req.headers.authorization.split(" ")[1]
    if(!authHeader) return res.status(403).json({"message":"invalid token"})
    

    try {
        const authorizated = jwt.verify(authHeader, process.env.SECRET)
        if(!authorizated) return res.status(401).json({"message":""})
        req.userId = authorizated.userId 
        next()
    }catch(error){
        console.log(error)
        res.status(403).json({"message": "inauthorized"})
    }
    

}

module.exports = verifyJWT