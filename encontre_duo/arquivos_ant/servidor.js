var http = require('http');
var querystring = require('querystring');
var url = require('url');
var mysql = require('mysql');

var servidor = http.createServer().listen(8000);
servidor.on('request', function(req, res){
    /*if (req.method == 'GET'){
        console.log('get!');
        var url_parts = url.parse(req.url, true);
        var query = url_parts.query;

        var nome = query.nome;
        var email = query.email;
        var senha = query.senha;
        var confirmacao = query.confirmacao;

        if (senha == confirmacao){
            var con = mysql.createConnection({
                host: "localhost",
                user: "root",
                password: "root",
                database: "pweb"
            });
    
            con.connect(function(err) {
                if (err) throw err;
                console.log("Conectado!");

                if (nome && email && senha){
                    var sql = "INSERT INTO usuarios (nome, email, senha) VALUES ('" 
                    + nome + "','" + email + "','" + senha + "');";

                    console.log(sql);

                    con.query(sql, function (err, result) {
                        if (err) throw err;
                        console.log("O usuário foi inserido com sucesso!");
                        res.write('O usuário foi inserido com sucesso!');
                        res.end();
                    });
                }

            });
        } else {
            res.write('As senhas não conferem!');
            res.end();
        }*/
    
    if (req.method == 'POST') {
        console.log('post!');
        var corpoReq = '';

        req.on('data', function (dados) {
            corpoReq += dados;
        });
    
        req.on('end', function () {
            var post = querystring.parse(corpoReq);
			
			var nome = post['nome'];
			var email = post['email'];
			var senha = post['senha'];
			var confirmacao = post['confirmacao'];
			
			if (senha == confirmacao){
            var con = mysql.createConnection({
                host: "localhost",
                user: "root",
                password: "root",
                database: "pweb"
            });
    
            con.connect(function(err) {
                if (err) throw err;
                console.log("Conectado!");

                if (nome && email && senha){
                    var sql = "INSERT INTO usuarios (nome, email, senha) VALUES ('" 
                    + nome + "','" + email + "','" + senha + "');";

                    console.log(sql);

                    con.query(sql, function (err, result) {
                        if (err) throw err;
                        console.log("O usuário foi inserido com sucesso!");
                        res.write('O usuário foi inserido com sucesso!');
                        res.end();
                    });
                }

            });
			} else {
				res.write('As senhas não conferem!');
				res.end();
			}
        });
    }

});
