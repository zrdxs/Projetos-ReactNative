const bodyParser = require('body-parser');
//cors é usado para permitir as requisições a partit de qualuqer origem
const cors = require('cors');

//Ira exportar um modulo com função para centralizar os modulos ao Consign
module.exports = app => {
    app.use(bodyParser.json())
    app.use(cors({
        origin: '*'
    }))
}