const express = require("express");
const server = express();

server.use(express.json());

const port = 3000;

const users = ["Baccan", "Diego", "Flávio"];

// Middleware global
server.use((req, res, next) => {
  console.time("Request");

  console.log(`Método: ${req.method}; URL: ${req.url}`);
  next();
  console.timeEnd("Request");
});

// Middleware local
function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: "User name is required" });
  }

  return next();
}

function checkUserInArray(req, res, next) {
  const user = users[req.params.index];

  if (!user) {
    return res.status(400).json({ error: "User does not exists" });
  }

  req.user = user;

  return next();
}

// CRUD - Create, Read, Update, Delete

// Query params = ?teste=1
server.get("/teste", (req, res) => {
  const nome = req.query.nome;

  return res.json({ message: `Hello ${nome}!` });
});

// Rota sem params
server.get("/users", (req, res) => {
  return res.json(users);
});

// Route params = /useres/1
server.get("/users/:index", checkUserInArray, (req, res) => {
  // const { index } = req.params;

  // return res.json(users[index]);
  return res.json(req.user);
});

// Request body = { "name": "Baccan", "email": "gustavobaccang@gmail.com" }
server.post("/users", checkUserExists, (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

server.put("/users/:index", checkUserExists, checkUserInArray, (req, res) => {
  const { name } = req.body;
  const { index } = req.params;

  users[index] = name;

  return res.json(users);
});

server.delete("/users/:index", checkUserInArray, (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  return res.send();
});

server.listen(port, () =>
  console.log(`Example server listening on port ${port}!`)
);
