# 📚 A Grande Biblioteca

Sistema web de gerenciamento de livros desenvolvido com **React, Node.js, Express e MySQL**. O projeto permite que usuários organizem suas bibliotecas pessoais, acompanhem o progresso de leitura e gerenciem suas contas por meio de uma aplicação com autenticação, controle de acesso e recursos administrativos.

O projeto foi desenvolvido como uma aplicação prática de estudo e desenvolvimento de sistemas, envolvendo conceitos de desenvolvimento Front-end e Back-end, APIs REST, banco de dados relacionais, segurança da informação e operações CRUD.

---

## 📖 Sobre o projeto

A **A Grande Biblioteca** é uma aplicação que permite organizar livros em uma biblioteca pessoal.

Cada usuário possui sua própria coleção de livros, podendo cadastrar, consultar, editar e excluir registros. O sistema também conta com gerenciamento de perfil, autenticação de usuários e um painel administrativo para gerenciamento das contas.

Além das funcionalidades principais, foram implementados mecanismos de segurança e auditoria para proteger as operações e registrar atividades importantes realizadas no sistema.

---

## 🚀 Funcionalidades

### 📚 Biblioteca pessoal

- [x] Cadastrar livros.
- [x] Listar livros cadastrados.
- [x] Editar informações dos livros.
- [x] Excluir livros.
- [x] Associar livros a autores.
- [x] Associar livros a gêneros.
- [x] Definir o status de leitura.
- [x] Informar a quantidade de exemplares.
- [x] Visualizar estatísticas da biblioteca.
- [x] Manter os livros separados por usuário.

### 🔐 Autenticação e contas

- [x] Cadastro de usuários.
- [x] Login com e-mail e senha.
- [x] Encerramento de sessão.
- [x] Verificação da sessão do usuário.
- [x] Proteção de rotas privadas.
- [x] Gerenciamento de perfil.
- [x] Atualização de dados pessoais.
- [x] Alteração de senha.
- [x] Bloqueio de contas inativas.
- [x] Controle de permissões por função de usuário.

### 🛡️ Administração

- [x] Painel administrativo.
- [x] Listagem de usuários cadastrados.
- [x] Consulta individual de usuários.
- [x] Bloqueio de contas.
- [x] Reativação de contas.
- [x] Consulta ao histórico de atividades dos usuários.
- [x] Controle de acesso exclusivo para administradores.

### 📋 Auditoria

- [x] Registro de atividades importantes.
- [x] Registro de tentativas de acesso não autorizado.
- [x] Histórico de ações realizadas pelos usuários.
- [x] Identificação da entidade relacionada à operação.
- [x] Armazenamento de endereço IP e data da atividade.
- [x] Consulta aos registros pelo painel administrativo.

### 🔑 Recuperação de senha

- [ ] Implementar recuperação de senha por e-mail.

---

## 🛠️ Tecnologias utilizadas

### Front-end

| Tecnologia | Utilização |
|---|---|
| React 19 | Construção da interface |
| JavaScript | Lógica da aplicação |
| HTML5 | Estrutura das páginas |
| CSS3 | Estilização e responsividade |
| React Router DOM | Navegação entre páginas |
| Vite | Ambiente de desenvolvimento e build |

### Back-end

| Tecnologia | Utilização |
|---|---|
| Node.js | Ambiente de execução |
| Express | Criação do servidor e das APIs |
| MySQL2 | Comunicação com o banco de dados |
| MySQL | Banco de dados relacional |
| bcrypt | Hash de senhas |
| express-session | Gerenciamento de sessões |
| express-mysql-session | Armazenamento de sessões no MySQL |
| express-rate-limit | Limitação de tentativas |
| Helmet | Proteção de cabeçalhos HTTP |
| CORS | Controle de acesso entre origens |
| dotenv | Gerenciamento de variáveis de ambiente |

### Ferramentas

- Git
- GitHub
- MySQL Workbench
- Visual Studio Code
- Postman (para testes de API)

---

## 🏗️ Arquitetura do sistema

O projeto utiliza uma arquitetura separada entre Front-end e Back-end.

O React é responsável pela interface e pela interação com o usuário. O servidor Express recebe as requisições HTTP, realiza as validações necessárias, aplica as regras de negócio e consulta ou modifica os dados no MySQL.

```text
             USUÁRIO
                |
                v
       FRONT-END - REACT
                |
                | Requisições HTTP
                v
        BACK-END - EXPRESS
                |
        +-------+-------+
        |               |
        v               v
   AUTENTICAÇÃO      REGRAS DE
   E SEGURANÇA       NEGÓCIO
        |               |
        +-------+-------+
                |
                v
          BANCO MYSQL
                |
        +-------+-------+
        |       |       |
        v       v       v
     LIVROS  USUÁRIOS  AUDITORIA
```

A comunicação entre Front-end e Back-end utiliza uma API REST, com respostas em formato JSON.

---

## 📂 Estrutura do projeto

A organização principal do repositório está dividida entre o Front-end, o Back-end e o arquivo de estrutura do banco de dados.

```text
personal-knowledge-base/
│
├── backend/
│   └── node_sql/
│       ├── services/
│       │   └── auditoria.js
│       │
│       ├── index.js
│       ├── package.json
│       └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── LivroLista.jsx
│   │   │   ├── Perfil.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Admin.jsx
│   │   │   ├── Cadastro.jsx
│   │   │   ├── Home.jsx
│   │   │   └── Login.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── estrutura_banco.sql
└── README.md
```

*Observação: a estrutura acima destaca os principais arquivos e diretórios do projeto, não necessariamente todos os arquivos existentes no repositório.*

---

## 🗄️ Banco de dados

O projeto utiliza o **MySQL 8** como sistema de gerenciamento de banco de dados.

Nome do banco:

```sql
crud_livros
```

O arquivo `estrutura_banco.sql`, localizado na raiz do repositório, contém o dump da estrutura do banco de dados, sem os registros cadastrados pelos usuários.

### Tabelas principais

| Tabela | Descrição |
|---|---|
| `usuarios` | Armazena os dados das contas e permissões dos usuários |
| `livros` | Armazena os livros cadastrados nas bibliotecas |
| `autores` | Armazena os autores dos livros |
| `generos` | Armazena os gêneros literários |
| `logs_auditoria` | Armazena o histórico de atividades |
| `sessions` | Armazena as sessões dos usuários |

Também existem tabelas auxiliares de backup:

- `livros_backup`
- `livros_backup_20261107`

### Relacionamentos

O banco utiliza chaves primárias e estrangeiras para relacionar os registros.

```text
USUARIOS
   |
   | 1:N
   v
LIVROS
   ^
   |
   | N:1
   |
AUTORES

LIVROS
   |
   | N:1
   v
GENEROS

USUARIOS
   |
   | 1:N
   v
LOGS_AUDITORIA
```

Cada livro está associado ao usuário que o cadastrou por meio do campo `id_usuario`. Isso permite que cada pessoa visualize e gerencie somente os livros pertencentes à própria biblioteca.

Os registros de auditoria também podem ser associados aos usuários responsáveis pelas atividades.

---

## 🔒 Segurança da aplicação

A segurança foi considerada durante o desenvolvimento do sistema.

### Proteção de senhas

As senhas não são armazenadas diretamente no banco de dados. O sistema utiliza a biblioteca `bcrypt` para gerar hashes das senhas antes de armazená-las.

### Gerenciamento de sessões

A autenticação utiliza sessões armazenadas no MySQL por meio do `express-session` e do `express-mysql-session`.

O cookie de sessão utiliza as propriedades:

- `httpOnly`, para impedir o acesso direto ao cookie por JavaScript no navegador;
- `sameSite`, para adicionar proteção contra determinadas requisições entre sites;
- tempo de expiração configurado para 24 horas.

### Proteção CSRF

O sistema utiliza tokens CSRF para proteger operações que modificam informações.

As requisições de escrita enviam o token por meio do cabeçalho:

```http
X-CSRF-Token
```

O servidor verifica o token recebido antes de permitir a execução da operação.

### Limitação de tentativas

O `express-rate-limit` controla tentativas de login e cadastro.

Configuração implementada:

- Até 5 tentativas;
- Janela de 15 minutos;
- Tentativas de login bem-sucedidas não são contabilizadas no limite.

### Controle de acesso

O sistema possui diferentes níveis de permissão:

- `usuario`: acesso às funcionalidades destinadas aos usuários comuns;
- `admin`: acesso às funcionalidades administrativas.

O Back-end verifica as permissões antes de permitir o acesso aos recursos protegidos.

### Outras medidas

- Helmet para proteção de cabeçalhos HTTP.
- Validação de dados recebidos.
- Consultas SQL parametrizadas.
- Controle de acesso às bibliotecas individuais.
- Proteção das rotas administrativas.

---

## 🔌 Principais rotas da API

O Back-end disponibiliza rotas REST para comunicação com o Front-end.

### Autenticação

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/auth/csrf-token` | Gera ou consulta o token CSRF |
| POST | `/api/auth/cadastro` | Cadastra um usuário |
| POST | `/api/auth/login` | Realiza login |
| GET | `/api/auth/me` | Consulta a sessão atual |
| POST | `/api/auth/logout` | Encerra a sessão |
| PUT | `/api/auth/senha` | Altera a senha |

### Perfil

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/usuarios/me` | Consulta o perfil |
| PUT | `/api/usuarios/me` | Atualiza os dados do perfil |

### Livros

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/livros` | Lista os livros do usuário |
| POST | `/api/livros/inserir` | Cadastra um livro |
| PUT | `/api/livros/:id` | Atualiza um livro |
| DELETE | `/api/livros/:id` | Exclui um livro |
| GET | `/api/livros/estatisticas` | Consulta estatísticas da biblioteca |

### Autores e gêneros

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/autores` | Lista autores |
| POST | `/api/autores` | Cadastra um autor |
| GET | `/api/generos` | Lista gêneros |
| POST | `/api/generos` | Cadastra um gênero |

### Administração

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/admin/teste` | Verifica o acesso administrativo |
| GET | `/api/admin/usuarios` | Lista usuários |
| GET | `/api/admin/usuarios/:id` | Consulta um usuário |
| GET | `/api/admin/usuarios/:id/logs` | Consulta atividades de um usuário |
| PUT | `/api/admin/usuarios/:id/bloquear` | Bloqueia uma conta |
| PUT | `/api/admin/usuarios/:id/reativar` | Reativa uma conta |

As rotas administrativas exigem autenticação e permissão de administrador. As rotas protegidas também dependem das regras de autenticação e segurança implementadas no servidor.

---

## ⚙️ Como executar o projeto

Para executar o projeto localmente, é necessário ter instalado:

- [Node.js](https://nodejs.org/)
- [MySQL](https://dev.mysql.com/downloads/mysql/)
- [Git](https://git-scm.com/)

### 1. Clonar o repositório

```bash
git clone https://github.com/Math-aMalafaia/personal-knowledge-base.git
```

Entre na pasta:

```bash
cd personal-knowledge-base
```

### 2. Configurar o banco de dados

Abra o MySQL Workbench ou o terminal do MySQL.

Crie o banco de dados:

```sql
CREATE DATABASE crud_livros
CHARACTER SET utf8mb4
COLLATE utf8mb4_0900_ai_ci;
```

O projeto disponibiliza o arquivo `estrutura_banco.sql` na raiz do repositório.

Antes de importá-lo, confira os valores do campo `status` da tabela `livros`: no arquivo atual, o texto correspondente a `Não lido` aparece com caracteres aparentemente corrompidos (`N├úo lido`). Corrija esse valor no SQL para `Não lido`, mantendo o arquivo em UTF-8, antes de realizar a importação.

Depois, importe o arquivo pelo MySQL Workbench ou pelo terminal:

```bash
mysql -u root -p crud_livros < estrutura_banco.sql
```

> **Atenção:** o dump contém comandos `DROP TABLE IF EXISTS`. A importação pode excluir tabelas existentes com os mesmos nomes. Utilize um banco novo ou faça um backup antes de importar.

### 3. Configurar o Back-end

Entre na pasta do Back-end:

```bash
cd backend/node_sql
```

Instale as dependências:

```bash
npm install
```

Crie um arquivo chamado `.env` nessa pasta.

Configure as variáveis de ambiente:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=SUA_SENHA
DB_NAME=crud_livros
DB_PORT=3306

FRONTEND_URL=http://localhost:5173

SESSION_SECRET=COLOQUE_UMA_CHAVE_SECRETA_FORTE_AQUI
```

Substitua `SUA_SENHA` pela senha configurada no MySQL.

A variável `SESSION_SECRET` deve receber uma chave aleatória, longa e difícil de adivinhar.

**Não publique o arquivo `.env` no GitHub.** Ele contém informações privadas de configuração.

Inicie o servidor:

```bash
npm start
```

O Back-end será iniciado em:

```text
http://localhost:3000
```

### 4. Configurar o Front-end

Abra outro terminal e entre na pasta do Front-end:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Opcionalmente, crie um arquivo `.env` para definir o endereço da API:

```env
VITE_API_URL=http://localhost:3000
```

Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

O Vite disponibilizará o endereço local, normalmente:

```text
http://localhost:5173
```

### 5. Acessar a aplicação

Com o Back-end e o Front-end em execução, abra o endereço:

```text
http://localhost:5173
```

A aplicação estará disponível para utilização.

---

## 🧪 Testes e validações

Durante o desenvolvimento, foram realizados testes funcionais envolvendo:

- Cadastro e autenticação de usuários.
- Criação, consulta, edição e exclusão de livros.
- Separação das bibliotecas por usuário.
- Atualização de perfil.
- Alteração de senha.
- Proteção de rotas privadas.
- Validação de permissões administrativas.
- Bloqueio e reativação de contas.
- Registro e consulta de logs de auditoria.
- Verificação de proteção CSRF.
- Limitação de tentativas de login e cadastro.

---

## 🔮 Próximos passos

O projeto continua em evolução.

### Funcionalidades futuras

- [ ] Implementar recuperação de senha por e-mail.
- [ ] Implementar envio de e-mails para recuperação de conta.
- [ ] Realizar testes adicionais de segurança.
- [ ] Avaliar melhorias para publicação em ambiente de produção.
- [ ] Implementar deploy da aplicação.

---

## 🎯 Objetivos de aprendizado

O desenvolvimento da A Grande Biblioteca proporciona a aplicação prática de diversos conceitos de desenvolvimento de sistemas:

- Desenvolvimento de interfaces com React.
- Criação de APIs REST com Node.js e Express.
- Integração entre Front-end e Back-end.
- Modelagem e relacionamentos de bancos de dados relacionais.
- Operações CRUD.
- Autenticação e autorização.
- Gerenciamento de sessões.
- Proteção contra ataques comuns em aplicações web.
- Registro e auditoria de atividades.
- Organização e manutenção de projetos.
- Versionamento de código com Git e GitHub.

O projeto representa uma evolução gradual do conhecimento, começando com operações básicas de gerenciamento de livros e avançando para recursos de autenticação, segurança e administração.

---

## 👨‍💻 Autor

Desenvolvido por **Mathaus Gomes**.

Projeto criado para estudos, prática e desenvolvimento de conhecimentos em Análise e Desenvolvimento de Sistemas.

---

## 📄 Licença

Este projeto está disponível para fins de estudo e aprendizado.

Consulte as condições de utilização antes de redistribuir ou utilizar partes do código em outros projetos.