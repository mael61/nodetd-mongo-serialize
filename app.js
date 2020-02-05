const express = require('express')
const bodyParser = require('body-parser')
// const db = require('./models')
const postRoutes = require('./app/api/post')
const authorRoutes = require('./app/api/author')
const mongoose = require('mongoose')

const AuthorModel = require('./models/mongoModels/author.js')
const PostModel = require('./models/mongoModels/post.js')
const db = {
    Author: AuthorModel,
    Post: PostModel
}
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.static('app/public'))

mongoose.connect('mongodb://127.0.0.1:27017/test', {useNewUrlParser: true, useUnifiedTopology: true})
.then(
() => console.log("Connected to MongoDB"),
    err => console.error(err)
);


 

app.get('/', async (req, res) => {
    res.status(200).send('Hello World!')
})

postRoutes(app, db)
authorRoutes(app, db)


module.exports = app

