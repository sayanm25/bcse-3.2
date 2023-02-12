// Registration and Login with Password Hash
import express from 'express'
import connectDB from './db/connectdb.js'
import bodyparser from 'body-parser'
import web from './routes/web.js'
import path from 'path'
import __dirname from './paths.js'
import session from 'express-session'
import mongoose from 'mongoose'
//import express-formidable from 'express-formidable'
const app = express()
// const session= require('express-session')
const port = process.env.PORT || '3000'
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost:27017";

// Database Connection
connectDB(DATABASE_URL)

mongoose.set('strictQuery', true);

// Set Template Engine
app.set('view engine', 'ejs')
app.use(session({secret:"myPassword",
resave: false,
saveUninitialized: false
}))
app.use(express.static(path.join(__dirname, "static")));
app.use(express.urlencoded({ extended: true }));

app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

// Load Routes
app.use('/', web)

app.listen(port, () => {
 console.log(`Server listening at http://localhost:${port}`)
})