require('dotenv').config();
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
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT)
});

conn.connect(function(err) {
    if (err) {
        console.log('Erro ao conectar ao Mysql:', err);
        return;
    }

    console.log('Conectado ao MySQL!');

    app.listen(3000, () => {
        console.log('Servidor rodando em http://localhost:3000');
    });
});

/* Rota principal */

app.get('/', (req, res) => {
    res.json({ message: 'Bem-vindo à API de livros!' });
});

/* =========================================================
   LIVROS
   ========================================================= */

/* Rota para exibir a lista de livros */

app.get('/api/livros', (req, res) => {

    const sql = `
        SELECT
            l.id,
            l.nome,
            l.autor_id,
            a.nome AS autor,
            l.genero_id,
            g.nome AS genero,
            l.status,
            l.quantidade
        FROM livros l
        INNER JOIN autores a ON l.autor_id = a.id
        INNER JOIN generos g ON l.genero_id = g.id
        ORDER BY l.id;
    `;

    conn.query(sql, (err, data) => {

        if (err) {
            console.log(err);
            return res.status(500).json({
                error: 'Erro ao buscar livros'
            });
        }

        res.status(200).json(data);
    });
});

/* =========================================================
   CADASTRAR LIVRO
   ========================================================= */

app.post('/api/livros/inserir', (req, res) => {

    const {
        nome,
        autor_id,
        genero_id,
        status,
        quantidade
    } = req.body;

    if (
        !nome ||
        !autor_id ||
        !genero_id ||
        !status ||
        quantidade === undefined ||
        quantidade === null
    ) {
        return res.status(400).json({
            error: 'Todos os campos são obrigatórios'
        });
    }

    const sql = `
        INSERT INTO livros
        (nome, autor_id, genero_id, status, quantidade)
        VALUES (?, ?, ?, ?, ?)
    `;

    conn.query(
        sql,
        [nome, autor_id, genero_id, status, quantidade],
        (err, result) => {

            if (err) {
                console.log(err);

                return res.status(500).json({
                    error: 'Erro ao inserir livro'
                });
            }

            return res.status(201).json({
                message: 'Livro inserido com sucesso',
                id: result.insertId
            });
        }
    );
});

/* =========================================================
   ATUALIZAR LIVRO
   ========================================================= */

app.put('/api/livros/:id', (req, res) => {

    const id = req.params.id;

    const {
        nome,
        autor_id,
        genero_id,
        status,
        quantidade
    } = req.body;

    if (
        !nome ||
        !autor_id ||
        !genero_id ||
        !status ||
        quantidade === undefined ||
        quantidade === null
    ) {
        return res.status(400).json({
            error: 'Todos os campos são obrigatórios'
        });
    }

    const sql = `
        UPDATE livros
        SET
            nome = ?,
            autor_id = ?,
            genero_id = ?,
            status = ?,
            quantidade = ?
        WHERE id = ?
    `;

    conn.query(
        sql,
        [
            nome,
            autor_id,
            genero_id,
            status,
            quantidade,
            id
        ],
        (err, result) => {

            if (err) {
                console.log(err);

                return res.status(500).json({
                    error: 'Erro ao atualizar livro'
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    error: 'Livro não encontrado'
                });
            }

            return res.status(200).json({
                message: 'Livro atualizado com sucesso',
                livro: {
                    id,
                    nome,
                    autor_id,
                    genero_id,
                    status,
                    quantidade
                }
            });
        }
    );
});

/* =========================================================
   DELETAR LIVRO
   ========================================================= */

app.delete('/api/livros/:id', (req, res) => {

    const id = req.params.id;

    const sql = 'DELETE FROM livros WHERE id = ?';

    conn.query(sql, [id], (err, result) => {

        if (err) {
            console.log(err);

            return res.status(500).json({
                error: 'Erro ao deletar livro'
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: 'Livro não encontrado'
            });
        }

        return res.status(200).json({
            message: 'Livro deletado com sucesso'
        });
    });
});

/* =========================================================
   ESTATÍSTICAS
   ========================================================= */

app.get('/api/livros/estatisticas', (req, res) => {

    const sql = `
        SELECT
            COALESCE(SUM(quantidade), 0) AS total,

            COALESCE(SUM(
                CASE
                    WHEN status = 'Lido'
                    THEN quantidade
                    ELSE 0
                END
            ), 0) AS lidos,

            COALESCE(SUM(
                CASE
                    WHEN status = 'lendo'
                    THEN quantidade
                    ELSE 0
                END
            ), 0) AS lendo,

            COALESCE(SUM(
                CASE
                    WHEN status = 'Não lido'
                    THEN quantidade
                    ELSE 0
                END
            ), 0) AS naoLidos

        FROM livros;
    `;

    conn.query(sql, (err, result) => {

        if (err) {
            console.log(err);

            return res.status(500).json({
                error: 'Erro ao buscar estatísticas dos livros'
            });
        }

        res.status(200).json(result[0]);
    });
});

/* =========================================================
   AUTORES
   ========================================================= */

/* Listar autores */

app.get('/api/autores', (req, res) => {

    const sql = `
        SELECT id, nome
        FROM autores
        ORDER BY nome ASC
    `;

    conn.query(sql, (err, data) => {

        if (err) {
            console.log(err);

            return res.status(500).json({
                error: 'Erro ao buscar autores'
            });
        }

        res.status(200).json(data);
    });
});

/* Cadastrar autores */

app.post('/api/autores', (req, res) => {

    const { nome } = req.body;

    if (!nome || !nome.trim()) {
        return res.status(400).json({error: 'O nome do autor é obrigatório'});
    }

    const nomeAutor = nome.trim();

    /* Verificar se ja existe */

    const sqlVerificar = `
        SELECT id, nome
        FROM autores
        WHERE nome = ?
    `;

    conn.query(sqlVerificar, [nomeAutor], (err, data) => {
        
        if (err) {
            console.lo(err);
            
            return res.status(500).json({erro: 'Erro ao verificar autor'});
        }

        /* Autor ja existe */

        if (data.length > 0) {
            return res.status(409).json({erro: 'Este autor já esta cadastrado', autor: data[0]});
        }

        /* Cadastrar novo autor */

        const sqlInserir = `
            INSERT INTO autores (nome)
            VALUES (?)
        `;

        conn.query(sqlInserir, [nomeAutor], (err, result) => {
            
            if (err) {
                console.log(err);

                return res.status(500).json({error: 'Erro ao cadastra autor'})
            }
            return res.status(201).json({message: 'Autor cadastrado com sucesso', autor: {id: result.insertId, nome: nomeAutor}});
        });
    });
});
/* =========================================================
   GÊNEROS
   ========================================================= */

/* Listar gêneros */

app.get('/api/generos', (req, res) => {

    const sql = `
        SELECT id, nome
        FROM generos
        ORDER BY nome ASC
    `;

    conn.query(sql, (err, data) => {

        if (err) {
            console.log(err);

            return res.status(500).json({
                error: 'Erro ao buscar gêneros'
            });
        }

        res.status(200).json(data);
    });
});

app.post('/api/generos', (req, res) => {
    
    const { nome } = req.body;

    if (!nome || !nome.trim()) {
        return res.status(400).json({error: 'O nome do genero é obrigatório'});
    }

    const nomeGenero = nome.trim();

    /* Verificar se ja existe */

    const sqlVerificar = `
    SELECT id, nome
    FROM generos
    WHERE nome = ?
    `;

    conn.query(sqlVerificar, [nomeGenero], (err, data) => {

        if (err) {
            console.log(err);

            return res.status(500).json({error: 'Erro ao buscar gêneros'});
        }

        if (data.length > 0) {
            return res.status(409).json({erro: 'Este genero já esta cadastrado', genero: data[0]})
        }

        /* Cadastra gênero */


        const sqlInserir = `
        INSERT INTO generos (nome)
        VALUES (?)
        `;

        conn.query(sqlInserir, [nomeGenero], (err, result) => {
            
            if (err) {
                console.log(err);

                return res.status(500).json({error: 'Erro ao cadastra autor'})
            }
            return res.status(201).json({message: 'Autor cadastrado com sucesso', genero: {id: result.insertId, nome: nomeGenero}});
        });
    });
});