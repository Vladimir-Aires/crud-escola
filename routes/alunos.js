const express = require("express");
const router = express.Router();

// Array inicial de exemplo
let alunos = [
  { id: 1, nome: "João", idade: 20 },
  { id: 2, nome: "Maria", idade: 22 }
];

// GET - listar todos
router.get("/", (req, res) => {
  res.json(alunos);
});

// GET por ID
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const aluno = alunos.find(a => a.id === id);
  if (!aluno) {
    return res.status(404).json({ erro: "Aluno não encontrado" });
  }
  res.json(aluno);
});

// POST - criar novo
router.post("/", (req, res) => {
  const { nome, idade } = req.body;

  // validações básicas
  if (!nome || !idade) {
    return res.status(400).json({ erro: "Nome e idade são obrigatórios" });
  }
  if (alunos.some(a => a.nome === nome)) {
    return res.status(400).json({ erro: "Aluno já cadastrado" });
  }

  const novo = {
    id: alunos.length ? alunos[alunos.length - 1].id + 1 : 1,
    nome,
    idade
  };
  alunos.push(novo);
  res.status(201).json(novo);
});

// PUT - atualizar por ID
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, idade } = req.body;
  const aluno = alunos.find(a => a.id === id);

  if (!aluno) {
    return res.status(404).json({ erro: "Aluno não encontrado" });
  }
  if (!nome || !idade) {
    return res.status(400).json({ erro: "Nome e idade são obrigatórios" });
  }

  aluno.nome = nome;
  aluno.idade = idade;

  res.json(aluno);
});

// DELETE - remover por ID
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = alunos.findIndex(a => a.id === id);

  if (index === -1) {
    return res.status(404).json({ erro: "Aluno não encontrado" });
  }

  alunos.splice(index, 1);
  res.json({ mensagem: "Aluno removido com sucesso" });
});

module.exports = router;
