const router = require('express').Router()
const multer = require("multer")
const User = require("../models/User")

const storage = multer.diskStorage({
    destination(req,file,cb){
        cb(null, 'public/uploads/')
    },
    filename(req,file,cb){
        cb(null, file.originalname)
    }

    
})
const upload = multer({storage})


router.post('/' , upload.single('avatar') , async (req,res) => {
        const userName = req.headers.name
        console.log(userName)
        console.log(req.file)
    try {
        await User.updateOne({name:userName}, {profilePicture:`../uploads/${req.file.originalname}` })

    }catch(error){
        res.status(400).json({"message":"error to store your image"})
    }
    
})


module.exports = router