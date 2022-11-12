const express = require('express');
const app = express();
const cors = require('cors')
const path = require('path')
const runIo = require("./config/io")
const server = require('http').createServer(app);
const dbConnect = require('./config/dbConnect')


//db connection
    dbConnect();

//midlewares
    app.use(express.urlencoded({ extended:false }));
    app.use(express.json());
    app.use(cors());
    app.use(express.static(path.join(__dirname, "public")))
    
    




//routers
app.use('/register', require('./routes/register'))
app.use('/login' , require('./routes/login'))
app.use('/profile', require('./routes/profile'))
app.use('/storeAvatar', require('./routes/storeAvatar'))
app.use("/loadMessages", require('./routes/loadMessages'))
app.use('/findUser', require("./routes/findUser"))




//io
runIo(server)

server.listen(4000, () => console.log(`Running on PORT 4000`))