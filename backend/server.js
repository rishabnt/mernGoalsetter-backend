const path = require('path')
const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const connectDB = require('./config/db')
const { errorHandler } = require('./middleware/errorMiddleware')

//Connects to DB using config from db.js
connectDB()

// Creates express variable
const app = express()

// Sets express properties to use JSON and URL Encoded features
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    ); 
    res.header(
        'Access-Control-Allow-Methods', 
        'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    );
    next();
});

// Links 2 parent routes to the route file and functions
app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

// Sets express to use ErrorHandler, overridden in Error Middleware file
app.use(errorHandler)

// Serve frontend
// if(process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../frontend/build')))

//   app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')))
// } else {
//   app.get('/', (req, res) => res.send('Please set environment to Production'))
// }

// Binds to ENV.Port and console logs message when server is started
app.listen(port, () => console.log(`Server started on port ${port}`))