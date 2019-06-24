const express = require("express");
const server = express();

server.use(express.json());

const port = 3000;

const users = ["Baccan", "Diego", "Flávio"];

// CRUD - Create, Read, Update, Delete

// Query params = ?teste=1
server.get("/teste", (req, res) => {
  const nome = req.query.nome;

  res.json({ message: `Hello ${nome}!` });
});

// Rota sem params
server.get("/users", (req, res) => {
  res.json(users);
});

// Route params = /useres/1
server.get("/users/:index", (req, res) => {
  const { index } = req.params;

  res.json(users[index]);
});

// Request body = { "name": "Baccan", "email": "gustavobaccang@gmail.com" }
server.post("/users", (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

server.put("/users/:index", (req, res) => {
  const { name } = req.body;
  const { index } = req.params;

  users[index] = name;

  return res.json(users);
});

server.delete("/users/:index", (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  return res.send();
});

server.listen(port, () =>
  console.log(`Example server listening on port ${port}!`)
);
