var express = require('express');
var app = express();
var bcrypt = require('bcrypt');
var mysql = require('mysql');

const saltRounds = 10;

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_duo'
});

app.use(express.json());

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.post('/cadastrar', function (req, res) {
    var user = req.body;

    bcrypt.hash(user.senha, saltRounds, function(err, hash){
        user.senha=hash;
        console.log(user);
        con.query('insert into t_usuario set ?', user, function (err, result) {
            if (err){
                res.send("erro sql");
                throw err;
            }
            console.error(result);
            res.send("sucesso");
        })
    });
});

app.listen(8000, function () {
    console.log('Server is listening on port 8000!');
});

app.get('/logar', function (req, res){
  var user = req.body;
  delete user.redirect;
  console.log(user);
  con.query ('select ? from t_usuario ', user, function (err, result){
    if (err){
      res.send("erro sql");
      throw err;
    }
    /*else if(){

    }*/
    console.error(result);
    res.send("sucesso");
  })
});
