var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();

app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

var users = require('./routes/users');
var jogos = require('./routes/jogos');
var busca = require('./routes/busca');

app.use('/users', users);
app.use('/jogos', jogos);
app.use('/busca', busca);

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(8000, function () {
    console.log('Servidor ouvindo na porta: 8000');
});