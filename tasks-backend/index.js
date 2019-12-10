const express = require('express')
const app = express()
const db = require('./config/db')
const consign = require('consign');

//está passando app como parametro aos modulos que serão carregados, nesse caso em middlewares.js
consign()
        .include('./config/passport.js')
        .then('./config/middlewares.js')
        //carregando os services
        .then('./api')
        .then('./config/routes.js')
        .into(app);

//definindo no app o objeto db que ira acessar o db do knex
app.db = db

app.listen(3000, () => {
    console.log('Backend Executando...')
})