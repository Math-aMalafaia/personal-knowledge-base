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

app.get('/livros', (req, res) => {

    const sql = 'SELECT * FROM livros';

    conn.query(sql, (err, data) => {

        if (err) {
            console.log(err);
            return;
        }

        console.log(data);

        res.render('layouts/livros', { livros: data });
    });
});

app.post('/livros/inserir', (req, res) => {
    const nome = req.body.nome;
    const autor = req.body.autor;
    const genero = req.body.genero;
    const status = req.body.status;
    const quantidade = req.body.quantidade;

    const sql = `INSERT INTO livros (nome, autor, genero, status, quantidade) VALUES ('${nome}', '${autor}', '${genero}', '${status}', '${quantidade}')`;

    conn.query(
        sql,
        [nome, autor, genero, status, quantidade],
        (err) => {
            if (err) {
                console.log(err);
                return;
            }
            res.redirect('/livros');
        }
    );
});

app.get('/livros/:id/editar', (req, res) => {

    const id = req.params.id;

    const sql = 'SELECT * FROM livros WHERE id = ?';

    conn.query(sql, [id], (err, data) => {

        if (err) {
            console.log(err);
            return;
        }

        res.render('layouts/editar', { livro: data[0] });
    });
});

app.post('/livros/:id/atualizar', (req, res) => {
    const id = req.params.id;

    const nome = req.body.nome;
    const autor = req.body.autor;
    const genero = req.body.genero;
    const status = req.body.status;
    const quantidade = req.body.quantidade;

    const sql = `UPDATE livros 
    SET nome = ?, autor = ?, genero = ?, status = ?, quantidade = ? WHERE id = ?`;

    conn.query(
        sql, 
        [nome, autor, genero, status, quantidade, id],
        (err) => {
            if (err) {
                console.log(err);
                return;
            }

            res.redirect('/livros');
        }
    );
});

app.post('/livros/:id/excluir', (req, res) => {
    const id = req.params.id;

    const sql = `DELETE FROM livros WHERE id = ?`;
    conn.query(
        sql, 
        [id],
        (err) => {
            if (err) {
                console.log(err);
                return;
            }

            res.redirect('/livros');
        }
    );
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