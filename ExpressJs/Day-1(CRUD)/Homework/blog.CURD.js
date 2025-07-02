import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

let posts = [];
let idcounter = 1;

app.post("/posts", (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required." });
  }
  const newPost = {
    id: idcounter++,
    title,
    content,
    createdAt: new Date(),
  };
  posts.push(newPost);
  res.status(201).json(newPost);
});

app.get("/get-all-posts", (req, res) => {
  res.json(posts);
});

app.get("/get-postById/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) {
    return res.status(404).json({ message: "Post not found." });
  }
  res.json(post);
});

app.put("/updatePost/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) {
    return res.status(404).json({ message: "Post not found." });
  }
  const { title, content } = req.body;
  if (title) post.title = title;
  if (content) post.content = content;

  res.json({ message: "Post updated.", post });
});

app.delete("/posts/:id", (req, res) => {
  const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: "Post not found." });
  }

  posts.splice(index, 1);
  res.json({ message: "Post deleted." });
});
app.listen(PORT, () => {
  console.log(`🚀 Blog API running at http://localhost:${PORT}`);
});
