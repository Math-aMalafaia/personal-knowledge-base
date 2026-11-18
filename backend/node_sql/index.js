require('dotenv').config();
const bcrypt = require('bcrypt');
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const session = require('express-session');
const { rateLimit } = require('express-rate-limit');

const MySQLStore  = require('express-mysql-session')(session);

const app = express();

const limitarTentativasLogin = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,

    standardHeaders: 'draft-8',
    legacyHeaders: false,

    skipSuccessfulRequests: true,

    message: {
        error: 'Muitas tentativas de login. Tente novamente em 15 minutos.'
    }
});

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT)
};

const conn = mysql.createConnection(dbConfig);

/* Conexão com Mysql */

const sessionStore = new MySQLStore({
    ...dbConfig,
    clearExpired: true,
    checkExpirationInterval: 900000,
    expiration: 86400000
});

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

if (!process.env.SESSION_SECRET) {
    throw new Error('SESSION_SECRET não foi configurado no .env');
}

app.use(session({
    name: 'crud.sid',
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000
    }
}));

function exigirAutenticacao(req, res, next) {
    if (!req.session.user) {
        return res.status(401).json({
            error: 'Faça login para acessar sua estante.'
        });
    }

    next();
}

conn.connect(function(err) {
    if (err) {
        console.log('Erro ao conectar ao MySQL:', err);
        return;
    }

    console.log('Conectado ao MySQL!');

    app.listen(3000, () => {
        console.log('Servidor rodando em http://localhost:3000');
    });
});

/* =========================================================
   cadastro
   ========================================================= */ 

app.post('/api/auth/cadastro', async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        // Validar campos
        if (!nome || !email || !senha) {
            return res.status(400).json({
                error: 'Nome, email e senha são obrigatórios.'
            });
        }

        const nomeUsuario = nome.trim();
        const emailUsuario = email.trim().toLowerCase();

        if (!nomeUsuario || nomeUsuario.length > 100) {
            return res.status(400).json({
                error: 'O nome deve ter entre 1 e 100 caracteres.'
            });
        }

        if (emailUsuario.length > 150 ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailUsuario)) {
            return res.status(400).json({
                error: 'Informe um email válido.'
            });
        }

        if (typeof senha !== 'string' || senha.length < 8) {
            return res.status(400).json({
                error: 'A senha deve ter pelo menos 8 caracteres.'
            });
        }

        // Gerar hash da senha
        const senhaHash = await bcrypt.hash(senha, 12);

        const sql = `
            INSERT INTO usuarios (nome, email, senha)
            VALUES (?, ?, ?)
        `;

        conn.query(sql, [nome, email, senhaHash], (err, result) => {
            if (err) {
                console.error('Erro ao cadastrar usuario', err);
                return res.status(500).json({
                    mensagem: 'Erro interno ao cadastrar usuário.'
                });
            }

            return res.status(201).json({
                mensagem: 'Usuário cadastrado com sucesso!',
                usuario: {
                    id_usuario: result.insertId,
                    nome,
                    email
                }
            });
        });

    } catch (error) {
        console.error('Erro no cadastro:', error);

        return res.status(500).json({
            error: 'Erro interno no servidor.'
        });
    }
});

/* =========================================================
   login
   ========================================================= */

app.post('/api/auth/login', limitarTentativasLogin, (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({
            error: 'Email e senha são obrigatórios.'
        });
    }

    const emailUsuario = email.trim().toLowerCase();

    const sql = `
        SELECT id_usuario, nome, email, senha, ativo
        FROM usuarios
        WHERE email = ?
        LIMIT 1
    `;

    conn.query(sql, [emailUsuario], async (err, data) => {
        if (err) {
            console.error('Erro ao consultar usuário:', err);

            return res.status(500).json({
                error: 'Erro interno ao realizar login.'
            });
        }

        if (data.length === 0) {
            return res.status(401).json({
                error: 'Email ou senha incorretos.'
            });
        }

        const usuario = data[0];

        if (!usuario.ativo) {
            return res.status(403).json({
                error: 'Esta conta está desativada.'
            });
        }

        try {
            const senhaValida = await bcrypt.compare(
                senha,
                usuario.senha
            );

            if (!senhaValida) {
                return res.status(401).json({
                    error: 'Email ou senha incorretos.'
                });
            }

            // Regenerar a sessão após autenticação
            req.session.regenerate((err) => {
                if (err) {
                    console.error('Erro ao criar sessão:', err);

                    return res.status(500).json({
                        error: 'Não foi possível iniciar a sessão.'
                    });
                }

                req.session.user = {
                    id_usuario: usuario.id_usuario,
                    nome: usuario.nome,
                    email: usuario.email
                };

                req.session.save((err) => {
                    if (err) {
                        console.error('Erro ao salvar sessão:', err);

                        return res.status(500).json({
                            error: 'Não foi possível salvar a sessão.'
                        });
                    }

                    return res.status(200).json({
                        message: 'Login realizado com sucesso!',
                        usuario: req.session.user
                    });
                });
            });

        } catch (error) {
            console.error('Erro ao validar senha:', error);

            return res.status(500).json({
                error: 'Erro interno ao validar senha.'
            });
        }
    });
});

/* =========================================================
   AUTENTICAÇÃO — VERIFICAR SESSÃO
   ========================================================= */

app.get('/api/auth/me', (req, res) => {
    if (!req.session.user) {
        return res.status(200).json({
            authenticated: false,
            usuario: null
        });
    }

    return res.status(200).json({
        authenticated: true,
        usuario: req.session.user
    });
});

/* =========================================================
   AUTENTICAÇÃO PERFIL — CONSULTAR DADOS
   ========================================================= */

app.get('/api/usuarios/me', exigirAutenticacao, (req, res) => {
    const idUsuario = req.session.user.id_usuario;

    const sql = `
        SELECT id_usuario, nome, email, data_criacao
        FROM usuarios
        WHERE id_usuario = ?
        LIMIT 1
    `;

    conn.query(sql, [idUsuario], (err, resultado) => {
        if (err){
            console.error('Erro ao consultar perfil: ', err);

            return res.status(500).json({error: "Erro interno ao consultar perfil"});
        }

        if (resultado.length ===  0){
            return res.status(404).json({usuario: null});
        }

        return res.status(200).json({usuario: resultado[0]});
    });
});


/* =========================================================
   AUTENTICAÇÃO PERFIL — ALTERAR SENHA
   ========================================================= */

app.put('/api/auth/senha', exigirAutenticacao, (req, res) => {
    const idUsuario = req.session.user.id_usuario;

    const { senhaAtual, novaSenha } = req.body;

    if (typeof senhaAtual !== 'string' || typeof novaSenha !== 'string' || !senhaAtual || !novaSenha) {
        return res.status(400).json({error: 'Informe a senha atual e a nova senha.'});
    }

    if (novaSenha.length < 8) {
        return res.status(400).json({error: 'A nova senha deve possuir pelo menos 8 caracteres.'});
    }

    const sqlBuscarSenha = `
        SELECT senha
        FROM usuarios
        WHERE id_usuario = ?
        LIMIT 1
    `;

    conn.query(sqlBuscarSenha, [idUsuario], (err, resultado) => {
        if (err) {
            console.error('Erro ao buscar senha:', err);

            return res.status(500).json({error: 'Erro interno ao verificar senha.'});
        }

        if (resultado.length === 0) {
            return res.status(404).json({error: 'Usuário não encontrado.'});
        }

        const senhaHashAtual = resultado[0].senha;

        bcrypt.compare(senhaAtual, senhaHashAtual, (err, senhaCorreta) => {
            if (err) {
                console.error('Erro ao comparar senha:', err);

                return res.status(500).json({error: 'Erro ao verificar senha atual.'});
            }

            if (!senhaCorreta) {
                return res.status(401).json({error: 'A senha atual está incorreta.'});
            }

            bcrypt.hash(novaSenha, 12, (err, novaSenhaHash) => {
                if (err) {
                    console.error('Erro ao criptografar nova senha:', err);

                    return res.status(500).json({error: 'Erro ao processar nova senha.'});
                }

                // Atualizar a senha no banco de dados
                const sqlAtualizarSenha = `
                    UPDATE usuarios
                    SET senha = ?
                    WHERE id_usuario = ?
                `;

                conn.query( sqlAtualizarSenha, [novaSenhaHash, idUsuario], (err) => {
                        if (err) {
                            console.error('Erro ao atualizar senha:', err);

                            return res.status(500).json({error: 'Erro ao atualizar senha.'});
                        }

                        return res.status(200).json({message: 'Senha alterada com sucesso.'});
                });
            });
        });
    });
});


/* =========================================================
   AUTENTICAÇÃO PERFIL — Atualizar nome e email
   ========================================================= */

app.put('/api/usuarios/me', exigirAutenticacao, (req, res) => {
    const idUsuario = req.session.user.id_usuario;

    const { nome, email } = req.body;

    if (typeof nome !== 'string' || typeof email !== 'string' || !nome.trim() || !email.trim()) {
        return res.status(400).json({error: 'Nome e e-mail são obrigatórios.'});
    }

    const nomeUsuario = nome.trim();
    const emailUsuario = email.trim().toLowerCase();

    const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formatoEmail.test(emailUsuario)) {
        return res.status(400).json({error: 'Informe um e-mail válido.'});
    }

    const sqlVerificarEmail = `
        SELECT id_usuario
        FROM usuarios
        WHERE email = ?
        AND id_usuario <> ?
        LIMIT 1
    `;

    conn.query(sqlVerificarEmail, [emailUsuario, idUsuario], (err, resultado) => {
        if (err) {
            console.error('Erro ao verificar e-mail:', err);

            return res.status(500).json({error: 'Erro ao verificar disponibilidade do e-mail.'});
        }

        if (resultado.length > 0) {
            return res.status(409).json({error: 'Este e-mail já está sendo utilizado.'});
        }

        const sqlAtualizar = `
            UPDATE usuarios
            SET nome = ?, email = ?
            WHERE id_usuario = ?
        `;

        conn.query(sqlAtualizar, [nomeUsuario, emailUsuario, idUsuario], (err) => {
            if (err) {
                console.error('Erro ao atualizar perfil:', err);

                return res.status(500).json({error: 'Erro ao atualizar perfil.'});
            }

            req.session.user.nome = nomeUsuario;
            req.session.user.email = emailUsuario;

            req.session.save((err) => {
                if (err) {
                    console.error('Erro ao salvar sessão:', err);

                    return res.status(500).json({error: 'Perfil atualizado, mas houve um erro ao atualizar a sessão.'});
                }

                return res.status(200).json({
                    message: 'Perfil atualizado com sucesso.',
                    usuario: {
                        id_usuario: idUsuario,
                        nome: nomeUsuario,
                        email: emailUsuario
                        }
                });
            });
        });
    });
});

/* =========================================================
   AUTENTICAÇÃO — logout
   ========================================================= */

app.post('/api/auth/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Erro ao encerrar sessão:', err);

            return res.status(500).json({
                error: 'Não foi possível encerrar a sessão.'
            });
        }

        res.clearCookie('crud.sid', {
            httpOnly: true,
            sameSite: 'lax',
            secure: false
        });

        return res.status(200).json({
            message: 'Logout realizado com sucesso!'
        });
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


app.get('/api/livros', exigirAutenticacao, (req, res) => {

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
        WHERE l.id_usuario = ?
        ORDER BY l.id;
    `;

    conn.query(sql, [req.session.user.id_usuario], (err, data) => {

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


app.post('/api/livros/inserir', exigirAutenticacao, (req, res) => {

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
        (nome, autor_id, genero_id, status, quantidade, id_usuario)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    conn.query(
        sql,
        [
            nome,
            autor_id,
            genero_id,
            status,
            quantidade,
            req.session.user.id_usuario
        ],
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


app.put('/api/livros/:id', exigirAutenticacao, (req, res) => {

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
        WHERE id = ? AND id_usuario = ?
    `;

    conn.query(
        sql,
        [
            nome,
            autor_id,
            genero_id,
            status,
            quantidade,
            id,
            req.session.user.id_usuario
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


app.delete('/api/livros/:id', exigirAutenticacao, (req, res) => {

    const id = req.params.id;

    const sql = `
        DELETE FROM livros
        WHERE id = ? AND id_usuario = ?
    `;

    conn.query(
        sql,
        [id, req.session.user.id_usuario],
        (err, result) => {

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
        }
    );
});


/* =========================================================
   ESTATÍSTICAS
   ========================================================= */


app.get('/api/livros/estatisticas', exigirAutenticacao, (req, res) => {

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

        FROM livros
        WHERE id_usuario = ?;
    `;

    conn.query(
        sql,
        [req.session.user.id_usuario],
        (err, result) => {

            if (err) {
                console.log(err);

                return res.status(500).json({
                    error: 'Erro ao buscar estatísticas dos livros'
                });
            }

            res.status(200).json(result[0]);
        }
    );
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