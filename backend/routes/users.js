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

    var resposta = {};
    var email = req.body.email;
    var senha = req.body.senha;

    database.connection.getConnection(function (err, connection) {
        if (err) {
            resposta["erro"] = 1;
            resposta["dados"] = "Erro Interno do Servidor";
            res.json(resposta);
        } else {
            connection.query('SELECT * FROM t_usuario WHERE email = ?', email, function (err, rows, fields) {
                if (err) {
                    resposta["erro"] = 1;
                    resposta["dados"] = "Erro SQL";
                    res.json(resposta);
                } else {
                    if (rows.length > 0) {
                        var hash = rows[0].senha;
                        bcrypt.compare(senha, hash, function (err, res) {
                            if (res == true) {
                                token = jwt.sign(rows[0], process.env.SECRET_KEY, {
                                    expiresIn: "3h"
                                });
                                resposta["erro"] = 0;
                                resposta["token"] = token;
                                resposta["dados"] = "Logado com sucesso";
                                res.json(resposta);
                            } else {
                                resposta["erro"] = 1;
                                resposta["dados"] = "Email e senha não compátíveis";
                                res.json(resposta);
                            }
                        });
                    } else {
                        resposta["erro"] = 1;
                        resposta["dados"] = "Email não existente";
                        res.json(resposta);
                    }
                }
            });
            connection.release();
        }
    });
});


/*  Middleware para validar o token (JWT).
    Requisições antes daqui não precisam de token;
    Todas as requisições após essa função precisarão ter o token validado
    para serem acessadas.    */
users.use(function (req, res, next) {
    var token = req.body.token || req.headers['token'];
    var resposta = {};
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, function (err) {
            if (err) {
                resposta["erro"] = 1;
                resposta["dados"] = "Token inválido";
                res.json(resposta);
            } else {
                next();
            }
        });
    } else {
        resposta["erro"] = 1;
        resposta["dados"] = "É necessário um token para acessar essa função";
        res.json(resposta);
    }
});

users.put('/atualizarPerfil/:userID', function (req, res) {
    // a implementar
});


module.exports = users;