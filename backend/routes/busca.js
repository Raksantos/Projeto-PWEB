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

busca.put('/buscaManual', function (req, res) {
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


busca.get('/buscaAutomaticaHorario/:userID', function (req, res) {

    var resposta = {};
    var userID = req.params.userID;

    database.connection.getConnection(function (err, connection) {
        if (err) {
            resposta["erro"] = 1;
            resposta["dados"] = "Erro interno do servidor";
            res.json(resposta);
        } else {
            connection.query("SELECT * FROM t_horario_disponivel WHERE id_usuario=?", userID, function (err, rows, fields) {
                if (err) {
                    throw err;
                } else if (rows.length > 0) {
                    var t="00:00:00"
                    var params = [t, rows[0].hora_fim, t, rows[0].hora_fim, rows[0].dia, rows[0].id_usuario];
                    const sql = "SELECT id_usuario FROM t_horario_disponivel WHERE ((hora_fim BETWEEN ? AND ?) OR (hora_inicio BETWEEN ? AND ?)) AND DIA=? AND id_usuario != ?";
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
                    })
                } else {
                    resposta["erro"] = 1;
                    resposta["dados"] = "Nenhum dado encontrado!";
                    res.json(resposta);
                }
                connection.release();
            });
        }
    });
});

busca.put('/buscaAutomaticaJogos', function (req, res) {

    var resposta = {};
    const userID = parseInt(req.body.id_usuario);
    const jogo = parseInt(req.body.id_jogo);
    const rank = parseInt(req.body.id_rank);

    database.connection.getConnection(function (err, connection) {
        if (err) {
            resposta["erro"] = 1;
            resposta["dados"] = "Erro interno do servidor";
            res.json(resposta);
        } else {
            var sql = "SELECT * FROM t_usuario_jogo WHERE id_jogo=? AND (id_rank=? OR (id_rank BETWEEN ?-2 AND ?+2)) AND id_usuario != ?";
            var params = [jogo, rank, rank, rank, userID];
            connection.query(sql, params, function (err, rows, result) {
                console.log(rows);
                if (err)
                    throw err;
                else if (rows.length > 0) {
                    console.log(rows);
                    var e = rows[0];
                    var params2;
                    var sql2;
                    if (e.id_mapa != null) {
                        params2 = [userID, e.id_jogo, e.id_jogo, e.id_rank, e.id_funcao, e.id_mapa];
                        sql2 = 'SELECT f.nome AS funcao, j.nome AS jogo, r.nome AS rank, r.id AS id_rank, m.nome AS mapa, u.nickname ';
                        sql2 += 'FROM t_funcao f, t_jogo j, t_rank r, t_mapa m, t_usuario_jogo u ';
                        sql2 += 'WHERE u.id_usuario=? AND u.id_jogo=? AND j.id=? AND r.id=? AND f.id=? AND m.id=?';
                    }
                    else {
                        params2 = [userID, e.id_jogo, e.id_jogo, e.id_rank, e.id_funcao];
                        sql2 = 'SELECT f.nome AS funcao, j.nome AS jogo, r.nome AS rank, r.id AS id_rank, u.nickname ';
                        sql2 += 'FROM t_funcao f, t_jogo j, t_rank r, t_usuario_jogo u ';
                        sql2 += 'WHERE u.id_usuario=? AND u.id_jogo=? AND j.id=? AND r.id=? AND f.id=?';
                    }
                    connection.query(sql, params2, function (err, result) {
                        if (err)
                            throw err;
                        else {
                            console.log(result);
                            resposta["erro"] = 0;
                            resposta["dados"] = result;
                            res.json(resposta);
                        }
                    });
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
