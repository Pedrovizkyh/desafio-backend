const express = require("express")
const router = express.Router()

const voluntarios = require("../data/voluntarios")

// GET - listar voluntários
router.get("/", (req, res) => {
  res.json(voluntarios)
})


// POST - cadastrar voluntário
router.post("/", (req, res) => {

  const { nome, email, telefone, mensagem } = req.body

  // validações

  if (!nome || nome.length < 3) {
    return res.status(400).json({ erro: "Nome precisa ter no mínimo 3 caracteres" })
  }

  const emailValido = /\S+@\S+\.\S+/
  if (!emailValido.test(email)) {
    return res.status(400).json({ erro: "Email inválido" })
  }

  const telefoneLimpo = telefone.replace(/\D/g, "")

  if (telefoneLimpo.length !== 10 && telefoneLimpo.length !== 11) {
    return res.status(400).json({ erro: "Telefone precisa ter 10 ou 11 números" })
  }

  if (mensagem && mensagem.length > 500) {
    return res.status(400).json({ erro: "Mensagem deve ter no máximo 500 caracteres" })
  }

  const novoVoluntario = {
    id: voluntarios.length + 1,
    nome,
    email,
    telefone: telefoneLimpo,
    mensagem
  }

  voluntarios.push(novoVoluntario)

  res.status(201).json({
    mensagem: "Voluntário cadastrado com sucesso",
    voluntario: novoVoluntario
  })
})

module.exports = router