var express = require('express');
var users = express.Router();
var database = require('../database/database');
var jwt = require('jsonwebtoken');
var token;
var cors = require('cors');
var bcrypt = require('bcrypt');
const saltRounds = 10;

process.env.SECRET_KEY = "keyjwt"; //pode ser qualquer valor configurado na variavel de ambiente

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

users.options('/logar', cors());
users.post('/logar', function (req, res) {

    var resposta = {};
    var email = req.body.email;
    var senha = req.body.senha;

    database.connection.getConnection(function (err, connection) {
        if (err) {
            resposta["erro"] = 1;
            resposta["dados"] = "Erro Interno do Servidor";
            res.json(resposta);
        } else {
            connection.query('SELECT * FROM t_usuario WHERE email = ?', [email], function (err, rows, fields) {
                if (err) {
                    resposta["erro"] = 1;
                    resposta["dados"] = "Erro SQL";
                    res.json(resposta);
                } else {
                    if (rows.length > 0) {
                        var usuario = rows[0];
                        var hash = usuario.senha;
                        bcrypt.compare(senha, hash, function (err, resp) {
                            if (resp == true) {
                                token = jwt.sign(JSON.parse(JSON.stringify(usuario)), process.env.SECRET_KEY);
                                resposta["erro"] = 0;
                                resposta["token"] = token;
                                delete usuario.senha;
                                resposta["dados"] = usuario;
                                res.json(resposta);
                            } else {
                                resposta["erro"] = 1;
                                resposta["dados"] = "Email e senha não compatíveis";
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


//  Middleware para validar o token (JWT).
//  Requisições antes daqui não precisam de token;
//  Todas as requisições após essa função precisarão ter o token validado
//  para serem acessadas.    
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

users.options('/atualizarHorario', cors());
users.put('/atualizarHorario', function (req, res) {
    var resposta = {};
    var usuario = req.body.usuario;
    var dia = req.body.dia;
    var horarioInicial = req.body.horarioInicial;
    var horarioFinal = req.body.horarioFinal;

    database.connection.getConnection(function (err, connection) {
        if (err) {
            resposta["erro"] = 1;
            resposta["dados"] = "Erro Interno do Servidor";
            res.json(resposta);
        } else {
            connection.query("SELECT * FROM t_horario_disponivel WHERE id_usuario=?", usuario, function (err, rows) {
                console.log(rows);
                if (err) {
                    resposta["erro"] = 1;
                    resposta["dados"] = "Erro SQL (select)!";
                    res.json(resposta);
                } else {
                    if (rows.length > 0) {
                        var sql = "UPDATE t_horario_disponivel set dia=?, hora_inicio=?, hora_fim=?";
                        var args = [dia, horarioInicial, horarioFinal];
                        connection.query(sql, args, function (err, result) {
                            if (!err) {
                                console.log(result);
                                resposta["erro"] = 0;
                                resposta["dados"] = "Configuração salva com sucesso!";
                                res.json(resposta);
                            } else {
                                console.log(err);
                                resposta["erro"] = 1;
                                resposta["dados"] = "Erro SQL (update)!";
                                res.json(resposta);
                            }
                        })
                    } else {
                        var horario = {
                            'id_usuario': usuario,
                            'dia': dia,
                            'hora_inicio':horarioInicial,
                            'hora_fim':horarioFinal
                        };

                        connection.query('INSERT INTO t_horario_disponivel SET ?', horario, function (err, result) {
                            if (!err) {
                                console.log(result);
                                resposta["erro"] = 0;
                                resposta["dados"] = "Configuração salva com sucesso!";
                                res.json(resposta);
                            } else {
                                console.log(err);
                                resposta["erro"] = 1;
                                resposta["dados"] = "Erro SQL (insert)!";
                                res.json(resposta);
                            }
                        });

                    }
                }
            })
            connection.release();
        }
    })
});

users.put('/atualizarPerfil', function (req, res) {
    var resposta = {};
    var usuario = req.body.usuario.id;
    var jogo = req.body.jogo;
    var nickname = req.body.nickname;
    var rank = req.body.rank;
    var funcao = req.body.funcao;
    var mapa = req.body.mapa;

    database.connection.getConnection(function (err, connection) {
        if (err) {
            resposta["erro"] = 1;
            resposta["dados"] = "Erro Interno do Servidor";
            res.json(resposta);
        } else {
            var params = [usuario, jogo];
            connection.query("SELECT * FROM t_usuario_jogo WHERE id_usuario=? AND id_jogo=?", params, function (err, rows) {
                console.log(rows);
                if (err) {
                    resposta["erro"] = 1;
                    resposta["dados"] = "Erro SQL (select)!";
                    console.log(err);
                    res.json(resposta);
                } else {
                    if (rows.length > 0) {
                        var sql = "UPDATE t_usuario_jogo SET nickname = ?, id_rank = ?, id_funcao = ?, id_mapa = ? WHERE id_usuario=? AND id_jogo=?";
                        var args = [nickname, rank, funcao, mapa, usuario, jogo];
                        connection.query(sql, args, function (err, result) {
                            if (!err) {
                                console.log(result);
                                resposta["erro"] = 0;
                                resposta["dados"] = "Configuração salva com sucesso!";
                                res.json(resposta);
                            } else {
                                console.log(err);
                                resposta["erro"] = 1;
                                resposta["dados"] = "Erro SQL (update)!";
                                res.json(resposta);
                            }
                        });
                    }
                    else {
                        var usuarioJogo = {
                            "id_usuario": usuario,
                            "id_jogo": jogo,
                            "id_funcao": funcao,
                            "id_rank": rank,
                            "id_mapa": mapa,
                            "nickname": nickname
                        }

                        connection.query('INSERT INTO t_usuario_jogo SET ?', usuarioJogo, function (err, result) {
                            if (!err) {
                                console.log(result);
                                resposta["erro"] = 0;
                                resposta["dados"] = "Configuração salva com sucesso!";
                                res.json(resposta);
                            } else {
                                console.log(err);
                                resposta["erro"] = 1;
                                resposta["dados"] = "Erro SQL (insert)!";
                                res.json(resposta);
                            }
                        });
                    }
                }
            });
            connection.release();
        }
    });
});

users.get('/perfisJogo/:userID', function (req, res) {
    var userID = req.params.userID;
    console.log(userID);

    var resposta = {
        "erro": 1,
        "dados": ""
    };
    var aux = [];
    database.connection.getConnection(function (err, connection) {
        if (err) {
            resposta["erro"] = 1;
            resposta["dados"] = "Erro interno do servidor";
            res.json(resposta);
        } else {
            connection.query('SELECT * FROM t_usuario_jogo WHERE id_usuario = ?', userID, function (err, rows, fields) {
                if (err)
                    throw err;
                else if (rows.length > 0) {
                    console.log(rows);
                    for (var i = 0, len = rows.length; i < len; i++) {
                        var e = rows[i];
                        var params;
                        var sql;
                        if (e.id_mapa != null) {
                            params = [userID, e.id_jogo, e.id_jogo, e.id_rank, e.id_funcao, e.id_mapa];
                            sql = 'SELECT f.nome AS funcao, j.nome AS jogo, r.nome AS rank, m.nome AS mapa, u.nickname ';
                            sql += 'FROM t_funcao f, t_jogo j, t_rank r, t_mapa m, t_usuario_jogo u ';
                            sql += 'WHERE u.id_usuario=? AND u.id_jogo=? AND j.id=? AND r.id=? AND f.id=? AND m.id=?';
                        }
                        else {
                            params = [userID, e.id_jogo, e.id_jogo, e.id_rank, e.id_funcao];
                            sql = 'SELECT f.nome AS funcao, j.nome AS jogo, r.nome AS rank, u.nickname ';
                            sql += 'FROM t_funcao f, t_jogo j, t_rank r, t_usuario_jogo u ';
                            sql += 'WHERE u.id_usuario=? AND u.id_jogo=? AND j.id=? AND r.id=? AND f.id=?';
                        }
                        connection.query(sql, params, function (err, result) {
                            if (err)
                                throw err;
                            else {
                                console.log(result);
                                aux.push(result);
                            }
                        });
                    }
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

users.get('/perfilJogo/:userID/:jogoID', function (req, res) {
    var userID = req.params.userID;
    var jogoID = req.params.jogoID;
    var params = [userID, jogoID];

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
            connection.query('SELECT * FROM t_usuario_jogo WHERE id_usuario = ? AND id_jogo = ?', params, function (err, rows, fields) {
                if (err)
                    throw err;
                else if (rows.length > 0) {
                    console.log(rows);
                    var e = rows[0];
                    var params2;
                    var sql;
                    if (e.id_mapa != null) {
                        params2 = [userID, e.id_jogo, e.id_jogo, e.id_rank, e.id_funcao, e.id_mapa];
                        sql = 'SELECT f.nome AS funcao, j.nome AS jogo, r.nome AS rank, m.nome AS mapa, u.nickname ';
                        sql += 'FROM t_funcao f, t_jogo j, t_rank r, t_mapa m, t_usuario_jogo u ';
                        sql += 'WHERE u.id_usuario=? AND u.id_jogo=? AND j.id=? AND r.id=? AND f.id=? AND m.id=?';
                    }
                    else {
                        params2 = [userID, e.id_jogo, e.id_jogo, e.id_rank, e.id_funcao];
                        sql = 'SELECT f.nome AS funcao, j.nome AS jogo, r.nome AS rank, u.nickname ';
                        sql += 'FROM t_funcao f, t_jogo j, t_rank r, t_usuario_jogo u ';
                        sql += 'WHERE u.id_usuario=? AND u.id_jogo=? AND j.id=? AND r.id=? AND f.id=?';
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
                } else {
                    resposta["dados"] = "Nenhum dado encontrado";
                    res.json(resposta);
                }
            });
            connection.release();
        }
    });
});

module.exports = users;
