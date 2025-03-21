const express = require("express");
const cors = require("cors");

const PostsService = require("./posts/posts.service");
const PostsController = require("./posts/posts.controller");

//Init express
const app = express();
const PORT = process.env.API_PORT || 8000;
app.use(cors());
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

//Init PostsController
const postsService = new PostsService();
const postsController = new PostsController(postsService);

//Set up api routes
app.get("/api/posts", postsController.getAll);
app.get("/api/posts/:id", postsController.getById);
app.get("/api/posts/:id/comments", postsController.getCommentsById);
app.get("/api/tags/:name", postsController.findByTag);