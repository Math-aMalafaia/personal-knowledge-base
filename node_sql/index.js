const express = require('express');
const exphbs = require('express-handlebars');
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

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});