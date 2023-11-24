import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let currentId = 1;

let posts = [];

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});
app.post("/submit", (req, res) => {
  const newPost = {
    id: currentId++,
    content: req.body.post,
  };
  posts.push(newPost);
  res.render("index.ejs", { posts: posts });

  console.log(posts);
});

app.post("/delete-post/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  posts = posts.filter((post) => post.id !== postId);
  res.render("index.ejs", { posts: posts });
});

app.post("/edit/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  if (req.body.edit) {
    posts = posts.map((post) => {
      if (post.id === postId) {
        return {
          id: post.id,
          content: req.body.edit,
        };
      }
      return post;
    });
  } else {
    console.log("Please enter a valid input into the edit box");
  }
  res.render("index.ejs", { posts: posts });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
