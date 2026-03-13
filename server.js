const express = require("express")
const app = express()

const voluntariosRoutes = require("./routes/voluntarios")

// middleware
app.use(express.json())

// rotas
app.use("/voluntarios", voluntariosRoutes)

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})