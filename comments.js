// Create web server
// 1. create express server
// 2. create router
// 3. add router to server
// 4. add router handler
// 5. start server

// 1. create express server
const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

// 2. create router
const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

// 3. add router to server
// 4. add router handler
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});
// 5. start server
app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  // commentsByPostId[req.params.id] = commentsByPostId[req.params.id] || [];
  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content });
  commentsByPostId[req.params.id] = comments;

  res.status(201).send(comments);
});

app.listen(4001, () => {
  console.log('Listening on 4001');
});git add comments.js
