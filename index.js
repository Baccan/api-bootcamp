const express = require("express");
const server = express();
const port = 3000;

const users = ["Baccan", "Diego", "Flávio"];

// Query params = ?teste=1
server.get("/teste", (req, res) => {
  const nome = req.query.nome;

  res.json({ message: `Hello ${nome}!` });
});

// Route params = /useres/1
server.get("/users/:index", (req, res) => {
  const { index } = req.params;

  res.json(users[index]);
});

// Request body = { "name": "Baccan", "email": "gustavobaccang@gmail.com" }

server.listen(port, () =>
  console.log(`Example server listening on port ${port}!`)
);
