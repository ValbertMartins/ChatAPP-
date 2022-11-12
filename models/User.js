const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    password: {
        type:String,
        required: true
    },
    profilePicture: {
        type: String,
        default: "https://media.tenor.com/a5a4uCOYfygAAAAC/profile-picture-rock.gif"
    }
})

const User = mongoose.model("User", UserSchema)

module.exports = User