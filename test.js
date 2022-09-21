
const mongoose = require('mongoose')
const Post = require('./database/models/Post')

mongoose.connect('mongodb://localhost/node-js-test-blog')

Post.find({
    title: 'My first blog post'
}, (error, posts) => {
    console.log(error,posts)
})

// Post.findByIdAndUpdate("63256b6b485f91b41da0b591",{
//     title: 'My first blog post title lorem ipsum'
// },(error, post) => {
//     console.log(error, post)
// })


// Post.create({
//     title: 'My second blog post',
//     description: 'Second Blog post description',
//     content: 'Second Lorem ipsum content'
// }, (error, post) =>{
//     console.log(error, post)
// })