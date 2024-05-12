// const express = require('express');
// const mongoose = require('mongoose');
// const http = require('http');
// const bodyparser = require('body-parser');
// const routes = require('./routes/routes')
// const multer = require('multer');
// const cors = require('cors');

// const app = express();

// mongoose.connect('mongodb://localhost:27017/crud');


// const server = http.createServer((req, res, err) => {
    
//     if(err){
//         console.log(err)
//     }else{
//         console.log('sjdhkshdkf')
//     }
// }).listen(8000)

// app.listen(8000, ()=>{
//     console.log('sdbchjsgdfhjhjdsf')
// })

//  app.use(multer({dest: 'bodyparser.json()'}));
//  app.use(multer({dest: 'routes'}))

// app.use(cors())
// app.use(bodyparser.json());
// app.use(routes);


















const express = require("express")
const mongoose = require("mongoose")
var routers = require('./routes/routes');
const bodyParser = require("body-parser")

const app = express()
const cors = require('cors');
const multer = require("multer");
const port = 5000;

const mongodatabaseURL ="mongodb://localhost:27017/crud";

mongoose.connect(mongodatabaseURL);

const connection = mongoose.connection


app.listen(port,()=>{
    console.log("Server is running port" +port);
})


connection.once("open",()=>{
    console.log("MongoDb Connected!!!......")
});


app.use(cors())
app.use(bodyParser.json());
app.use(routers);



// const core = multer({dest: cors()});
// const body = multer({dest: bodyParser.json()})
// const router = multer({dest: routers})



