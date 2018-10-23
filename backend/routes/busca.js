var express = require('express');
var busca = express.Router();
var database = require('../database/database');
var jwt = require('jsonwebtoken');


/*  Middleware para validar o token (JWT).
    Requisições antes daqui não precisam de token;
    Todas as requisições após essa função precisarão ter o token validado
    para serem acessadas.    */
busca.use(function (req, res, next) {
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

busca.put('/buscarDuos', function (req, res) {
    var resposta = {};
    var jogo = parseInt(req.body.jogo);
    var rank = parseInt(req.body.rank);
    var funcao = parseInt(req.body.funcao);
    const params = [jogo, funcao, rank];
    console.log(params);

    database.connection.getConnection(function (err, connection) {
        if (err) {
            resposta["erro"] = 1;
            resposta["dados"] = "Erro interno do servidor";
            res.json(resposta);
        } else {
            var sql = "SELECT * FROM t_usuario_jogo WHERE id_jogo=? AND id_funcao=? AND id_rank=?";
            connection.query(sql, params, function (err, rows, result) {
                console.log(rows);
                if (err)
                    throw err;
                else if (rows.length > 0) {
                    resposta["erro"] = 0;
                    resposta["dados"] = rows;
                    res.json(resposta);
                }
                else {
                    resposta["erro"] = 1;
                    resposta["dados"] = "Nenhum dado encontrado!";
                    res.json(resposta);
                }
            });
            connection.release();
        }
    });

});

module.exports = busca;
