const express = require("express");
const server = express();
const port = 3000;

// Query params = ?teste=1
server.get("/teste", (req, res) => {
  const nome = req.query.nome;

  res.json({ message: `Hello ${nome}!` });
});

// Route params = /useres/1
server.get("/users/:id", (req, res) => {
  const { id } = req.params;

  res.json({ message: `Buscando usuário ${id}!` });
});

// Request body = { "name": "Baccan", "email": "gustavobaccang@gmail.com" }

server.listen(port, () =>
  console.log(`Example server listening on port ${port}!`)
);
