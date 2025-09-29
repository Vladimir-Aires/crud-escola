const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())


//Importar e mapear rota de alunos



//Importar e mapear rota de professores



app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000')
})




