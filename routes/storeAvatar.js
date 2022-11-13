const router = require('express').Router()
const multer = require("multer")
const User = require("../models/User")
const verifyJWT = require('../middlewares/verifyJWT')

const storage = multer.diskStorage({
    destination(req,file,cb){
        cb(null, 'public/uploads/')
    },
    filename(req,file,cb){
        cb(null, file.originalname)
    }

    
})
const upload = multer({storage})


router.post('/' ,verifyJWT, upload.single('avatar') , async (req,res) => {
          
    try {
        await User.findByIdAndUpdate(req.userId, {profilePicture:`${req.file.originalname}` })
        res.status(201).json(req.file.originalname)
    }catch(error){
        res.status(400).json({"message":"error to store your image"})
    }
    
})


module.exports = router