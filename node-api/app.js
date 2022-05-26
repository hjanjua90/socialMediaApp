const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(
    process.env.MONGO_URI,{useNewUrlParser: true}
)
.then(()=>{
    console.log('DB connected')
});

mongoose.connection.on('error', err =>{
    console.log(`DB connection error: ${err.message}`)
});
//bring in routes
const postRoutes = require('./routes/post')
const authRoutes = require('./routes/auth')


//middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
// app.use(cookieParser());
app.use(expressValidator());
app.use("/", postRoutes);
app.use("/", authRoutes);

// app.use(function (err, req, res, next) {
//     if (err.name === "UnauthorizedError") {
//         res.status(401).json({error: "Unauthorized!"});
//     } 
//     // else {
//     //     next(err);
//     // }
//     });

const port = process.env.PORT;
app.listen(port, ()=>{
    console.log(`A Node Js API is listening on port: ${port}`)
});