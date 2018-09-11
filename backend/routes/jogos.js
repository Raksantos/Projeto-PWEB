var express = require('express');
var jogos = express.Router();
var database = require('../database/database');
var jwt = require('jsonwebtoken');




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

jogos.get('/getJogo/:gameID', function (req, res) {
    var gameID = req.params.gameID;
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
            connection.query('SELECT * FROM t_jogo WHERE id =?', gameID, function (err, rows, fields) {
                if (!err) {
                    resposta["erro"] = 0;
                    resposta["dados"] = rows[0];
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

jogos.get('/listarRanks/:gameID', function (req, res){

    var gameID = req.params.gameID;
    console.log(gameID);

    var resposta = {
        "erro": 1,
        "dados": ""
    };

    database.connection.getConnection(function (err, connection) {
        if (err) {
            resposta["erro"] = 1;
            resposta["dados"] = "Erro interno do servidor";
            res.json(resposta);
        } else {
            connection.query('SELECT * FROM t_rank WHERE id_jogo = ?', gameID, function(err, rows, fields){
                if(err)
                    throw err;
                else if (rows.length > 0) {
                    console.log(rows);
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
    })
});

jogos.get('/listarFuncoes/:gameID', function (req, res){

    var gameID = req.params.gameID;
    console.log(gameID);

    var resposta = {
        "erro": 1,
        "dados": ""
    };

    database.connection.getConnection(function (err, connection) {
        if (err) {
            resposta["erro"] = 1;
            resposta["dados"] = "Erro interno do servidor";
            res.json(resposta);
        } else {
            connection.query('SELECT * FROM t_funcao WHERE id_jogo = ?', gameID, function(err, rows, fields){
                if(err)
                    throw err;
                else if (rows.length > 0) {
                    console.log(rows);
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
    })
});

jogos.get('/listarMapas/:gameID', function (req, res){

    var gameID = req.params.gameID;
    console.log(gameID);

    var resposta = {
        "erro": 1,
        "dados": ""
    };

    database.connection.getConnection(function (err, connection) {
        if (err) {
            resposta["erro"] = 1;
            resposta["dados"] = "Erro interno do servidor";
            res.json(resposta);
        } else {
            connection.query('SELECT * FROM t_mapa WHERE id_jogo = ?', gameID, function(err, rows, fields){
                if(err)
                    throw err;
                else if (rows.length > 0) {
                    console.log(rows);
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
    })
});


jogos.get('/getRank/:rankID', function (req, res){

    var rankID = req.params.rankID;
    console.log(rankID);

    var resposta = {
        "erro": 1,
        "dados": ""
    };

    database.connection.getConnection(function (err, connection) {
        if (err) {
            resposta["erro"] = 1;
            resposta["dados"] = "Erro interno do servidor";
            res.json(resposta);
        } else {
            connection.query('SELECT * FROM t_rank WHERE id = ?', rankID, function(err, rows, fields){
                if(err)
                    throw err;
                else if (rows.length > 0) {
                    console.log(rows);
                    resposta["erro"] = 0;
                    resposta["dados"] = rows[0];
                    res.json(resposta);
                } else {
                    resposta["dados"] = "Nenhum dado encontrado";
                    res.json(resposta);
                }
            });
            connection.release();
        }
    })
});

jogos.get('/getFuncao/:funcaoID', function (req, res){

    var funcaoID = req.params.funcaoID;
    console.log(funcaoID);

    var resposta = {
        "erro": 1,
        "dados": ""
    };

    database.connection.getConnection(function (err, connection) {
        if (err) {
            resposta["erro"] = 1;
            resposta["dados"] = "Erro interno do servidor";
            res.json(resposta);
        } else {
            connection.query('SELECT * FROM t_funcao WHERE id = ?', funcaoID, function(err, rows, fields){
                if(err)
                    throw err;
                else if (rows.length > 0) {
                    console.log(rows);
                    resposta["erro"] = 0;
                    resposta["dados"] = rows[0];
                    res.json(resposta);
                } else {
                    resposta["dados"] = "Nenhum dado encontrado";
                    res.json(resposta);
                }
            });
            connection.release();
        }
    })
});

jogos.get('/getMapa/:mapaID', function (req, res){

    var mapaID = req.params.mapaID;
    console.log(mapaID);

    var resposta = {
        "erro": 1,
        "dados": ""
    };

    database.connection.getConnection(function (err, connection) {
        if (err) {
            resposta["erro"] = 1;
            resposta["dados"] = "Erro interno do servidor";
            res.json(resposta);
        } else {
            connection.query('SELECT * FROM t_mapa WHERE id = ?', mapaID, function(err, rows, fields){
                if(err)
                    throw err;
                else if (rows.length > 0) {
                    console.log(rows);
                    resposta["erro"] = 0;
                    resposta["dados"] = rows[0];
                    res.json(resposta);
                } else {
                    resposta["dados"] = "Nenhum dado encontrado";
                    res.json(resposta);
                }
            });
            connection.release();
        }
    })
});

module.exports = jogos;