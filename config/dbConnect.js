const mongoose = require('mongoose');
require('dotenv').config()


const dbConnect = async () => {
    try {
        await mongoose.connect(`${process.env.DB_SERVER}`)
        console.log('Connected To mongoDB')

    } catch(error){
        console.log(error)
    }
}

module.exports = dbConnect