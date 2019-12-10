const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const obterHash = (password, callback) => {
        bcrypt.genSalt(10, (err, salt) =>{
            //callback ira retornar a senha criptografada
            bcrypt.hash(password, salt, null, (err, hash) => callback(hash))
        })
    }

    const save = (req, res) => {
        //callback hash está retornando o resultado da func obterHash
        obterHash(req.body.password, hash => {
            const password = hash
    
            app.db('users')
                .insert({ name: req.body.name,
                          email: req.body.email,
                          password })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).json(err))
        })
    }

    return { save }
}

