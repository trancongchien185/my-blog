const express = require('express');

const expressEdge = require('express-edge')
const path = require('path');

const port = 3000;
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const Post = require('./database/models/Post');

const createPostController = require('./controllers/createPost')
const homePageController = require('./controllers/homePage')
const storePostController = require('./controllers/storePost')

const app = new express()

mongoose.connect('mongodb://localhost/node-js-blog')

app.use(fileUpload())
app.use(express.static('public'));
app.use(expressEdge.engine);
app.set('views', path.resolve(__dirname, "views"));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))



const validateCreatePostMiddleware = (req, res, next) =>{
    if(!req.files.image || !req.body.username || !req.body.title || !req.body.subtitle || !req.body.content){
       return res.redirect('/posts/new') 
    }
    next()
}

app.use('/posts/store',validateCreatePostMiddleware);

app.get("/", homePageController);
app.get("/posts/new", createPostController)
app.post('/posts/store', storePostController);


app.get('/about', (req, res) => {
    res.render('about')
});

app.get('/contact', (req, res) => {
    res.render('contact')
});

app.get('/post/:id', async (req, res) => {
    const post = await Post.findById(req.params.id)
    res.render('post', {
        post
    })
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

app.get('/posts/new', (req, res) => {
    res.render("create")
});

