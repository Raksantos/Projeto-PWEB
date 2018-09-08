var express = require('express');
var jogos = express.Router();
var database = require('../database/database');
var cors = require('cors');
var jwt = require('jsonwebtoken');

jogos.use(cors());

/*  Middleware para validar o token (JWT).
    Requisições antes daqui não precisam de token;
    Todas as requisições após essa função precisarão ter o token validado
    para serem acessadas.    */
jogos.use(function (req, res, next) {
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

jogos.get('/listarJogos', function (req, res) {

    var resposta = {
        "erro": 1,
        "dados": ""
    };

    database.connection.getConnection(function (err, connection) {
        if (err) {
            resposta["erro"] = 1;
            resposta["dados"] = "Erro Interno do Servidor";
            res.json(resposta);
        } else {
            connection.query('SELECT * FROM t_jogo', function (err, rows, fields) {
                if (!err) {
                    resposta["erro"] = 0;
                    resposta["dados"] = rows;
                    res.json(resposta);
                } else {
                    resposta["dados"] = "Nenhum dado encontrado";
                    res.json(resposta);
                }
            });
            connection.release();
        }
    });
});

module.exports = jogos;