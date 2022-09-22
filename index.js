const express = require("express");

const expressEdge = require("express-edge");
const Post = require("./database/models/Post");

const port = 3000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");


const createPostController = require("./controllers/createPost");
const homePageController = require("./controllers/homePage");
const storePostController = require("./controllers/storePost");
const getPostController = require('./controllers/getPost')
const createUserController = require('./controllers/createUser')

const app = new express();

mongoose.connect("mongodb://localhost/node-js-blog");

app.use(fileUpload());
app.use(express.static("public"));
app.use(expressEdge.engine);
app.set("views", path.resolve(__dirname, "views"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const validateCreatePostMiddleware storePost = require('./middleware/storePost') ;

app.use("/posts/store", storePost);

app.get("/", homePageController);
app.get('/auth/register', createUserController);
app.get("/post/:id", getPostController)
app.get("/posts/new", createPostController);
app.post("/posts/store", storePostController);


app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/post/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render("post", {
    post,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/posts/new", (req, res) => {
  res.render("create");
});
