var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

var users = require('./routes/users');
var jogos = require('./routes/jogos');

app.use('/users', users);
app.use('/jogos', jogos);

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(8000, function () {
    console.log('Servidor ouvindo na porta: 8000');
});