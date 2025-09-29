const express = require("express");
const router = express.Router();

let professores = [
  { id: 1, nome: "Carlos", disciplina: "Matemática" },
  { id: 2, nome: "Ana", disciplina: "Português" }
];

router.get("/", (req, res) => res.json(professores));

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const prof = professores.find(p => p.id === id);
  if (!prof) return res.status(404).json({ erro: "Professor não encontrado" });
  res.json(prof);
});

router.post("/", (req, res) => {
  const { nome, disciplina } = req.body;
  if (!nome || !disciplina) {
    return res.status(400).json({ erro: "Nome e disciplina são obrigatórios" });
  }
  if (professores.some(p => p.nome === nome)) {
    return res.status(400).json({ erro: "Professor já cadastrado" });
  }

  const novo = {
    id: professores.length ? professores[professores.length - 1].id + 1 : 1,
    nome,
    disciplina
  };
  professores.push(novo);
  res.status(201).json(novo);
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, disciplina } = req.body;
  const prof = professores.find(p => p.id === id);

  if (!prof) return res.status(404).json({ erro: "Professor não encontrado" });

  prof.nome = nome;
  prof.disciplina = disciplina;

  res.json(prof);
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = professores.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ erro: "Professor não encontrado" });

  professores.splice(index, 1);
  res.json({ mensagem: "Professor removido com sucesso" });
});
module.exports = router;
