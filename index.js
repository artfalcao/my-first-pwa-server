const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(bodyParser.json());
app.use(cors());

const messageRoute = require("./src/routes/message.routes")


/* ROTAS */
app.use(messageRoute);

app.listen(5000, () => {console.log('Servidor rodando na porta 5000')})