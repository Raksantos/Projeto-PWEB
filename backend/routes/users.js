var express = require('express');
var users = express.Router();
var database = require('../database/database');
var cors = require('cors');
var jwt = require('jsonwebtoken');
var token;
var bcrypt = require('bcrypt');
const saltRounds = 10;

users.use(cors());

users.post('/cadastrar', function (req, res) {

    var resposta = {
        "erro": 1,
        "dados": ""
    };

    var usuario = {
        "nome": req.body.nome,
        "email": req.body.email,
        "senha": req.body.senha,
        "descricao": req.body.descricao
    };

    database.connection.getConnection(function (err, connection) {
        if (err) {
            resposta["erro"] = 1;
            resposta["dados"] = "Erro interno do servidor";
            res.json(resposta);
        } else {
            bcrypt.hash(usuario["senha"], saltRounds, function (err, hash) {

                usuario["senha"] = hash;

                console.log("Dados do usuário a ser cadastrado: " + JSON.stringify(usuario));

                connection.query('insert into t_usuario set ?', usuario, function (err, result) {
                    if (!err) {
                        console.log(result);
                        resposta["erro"] = 0;
                        resposta["dados"] = "Usuário cadastrado com sucesso!";
                        res.json(resposta);
                    } else {
                        resposta["erro"] = 1;
                        resposta["dados"] = "Erro SQL!";
                        res.json(resposta);
                    }
                });
                connection.release();
            });
        }
    });
});

users.get('/logar', function (req, res) {
    var user = req.body;
    delete user.redirect;
    console.log(user);
    con.query('select ? from t_usuario ', user, function (err, result) {
        if (err) {
            res.send("erro sql");
            throw err;
        }
        /*else if(){
    
        }*/
        console.error(result);
        res.send("sucesso");
    })
});

module.exports = users;