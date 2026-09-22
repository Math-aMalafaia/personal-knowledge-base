const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql2');    
const path = require('path');

const app = express();

app.engine('handlebars', exphbs.engine());

app.set('view engine', 'handlebars');

app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.render('layouts/home');
});

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '2606',
    database: 'crud_livros'
})

conn.connect(function(err) {
    if (err) {
        console.log('Erro ao conectar ao Mysql:', err);
        return;
    }

    console.log('Conectado ao MySQL!')
})

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});