const express = require('express');
const mysql = require('mysql2');    
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

/* Conexão com Mysql */

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

    app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
    });
})

/* Rota pricipal */

app.get('/', (req, res) => {
    res.json({ message: 'Bem-vindo à API de livros!' });
});

/* Rota para exibir a lista de livros */

app.get('/api/livros', (req, res) => {

    const sql = 'SELECT * FROM livros';

    conn.query(sql, (err, data) => {

        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Erro ao buscar livros' });
        }

        res.status(200).json(data);
    });
});

/* Cadastrar */

app.post('/api/livros/inserir', (req, res) => {
    const {nome, autor, genero, status, quantidade} = req.body;

    if (!nome || !autor || !genero || !status || !quantidade) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    const sql = `INSERT INTO livros (nome, autor, genero, status, quantidade) VALUES (?, ?, ?, ?, ?)`;

    conn.query(
        sql,
        [nome, autor, genero, status, quantidade],
        (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: 'Erro ao inserir livro' });
            }
            return res.status(201).json({ message: 'Livro inserido com sucesso',  });
        });
});

/* Atualizar */

app.put('/api/livros/:id', (req, res) => {

    const id = req.params.id;

    const {nome, autor, genero, status, quantidade} = req.body;

    if (!nome || !autor || !genero || !status || !quantidade) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    const sql = `UPDATE livros SET nome = ?, autor = ?, genero = ?, status = ?, quantidade = ? WHERE id = ?`;

    conn.query(
        sql,
        [nome, autor, genero, status, quantidade, id],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: 'Erro ao atualizar livro' });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Livro não encontrado' });
            }
            return res.status(200).json({ 
                message: 'Livro atualizado com sucesso',
                livro   : {
                    id,
                    nome,
                    autor,
                    genero,
                    status,
                    quantidade
                }
            });
        }
    );
});

/* Deletar */

app.delete('/api/livros/:id', (req, res) => {
    const id = req.params.id

    const sql = 'DELETE FROM livros WHERE id = ?';

    conn.query(sql, [id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Erro ao deletar livro' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Livro não encontrado' });
        }
            return res.status(200).json({ message: 'Livro deletado com sucesso' });
        }
    );
});

