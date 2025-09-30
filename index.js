const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// importa os routers criados pelos membros
const alunosRouter = require("./routes/alunos");
const professoresRouter = require("./routes/professores");

// usa os routers com prefixos diferentes
app.use("/", alunosRouter);
app.use("/", professoresRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
