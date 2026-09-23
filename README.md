# 📚 CRUD de Livros

Um sistema CRUD desenvolvido para **cadastrar, consultar, editar e excluir livros**.

O projeto foi criado como uma forma prática de estudar e desenvolver conhecimentos em **desenvolvimento Back-end, banco de dados, APIs e operações CRUD**, utilizando uma aplicação de gerenciamento de livros.

---

## 🚀 Sobre o projeto

O sistema permite gerenciar uma coleção de livros através das quatro operações fundamentais de um CRUD:

* **Create** — Cadastrar novos livros
* **Read** — Visualizar livros cadastrados
* **Update** — Editar livros existentes
* **Delete** — Excluir livros

A aplicação possui uma interface para realizar essas operações e utiliza um banco de dados MySQL para armazenar as informações.

---

## 🛠️ Tecnologias utilizadas

* **Node.js**
* **Express**
* **MySQL**
* **EJS**
* **HTML**
* **CSS**
* **JavaScript**
* **Git e GitHub**

---

## 📚 Funcionalidades

### ➕ Cadastrar livros

Permite adicionar um novo livro ao sistema através de um formulário.

As informações cadastradas podem incluir dados como:

* 📖 Título
* ✍️ Autor
* 🏷️ Gênero
* 📄 Quantidade
* 📄 Status

---

### 👀 Listar livros

Exibe os livros cadastrados no banco de dados, permitindo visualizar as informações armazenadas.

---

### ✏️ Editar livros

Permite selecionar um livro existente e alterar suas informações.

O usuário pode acessar a página de edição através da rota correspondente ao livro.

Exemplo:

```text
/livros/1/editar
```

---

### 🗑️ Excluir livros

Permite remover um livro cadastrado no sistema.

Essa funcionalidade utiliza o identificador (`id`) do livro para localizar o registro no banco de dados.

---

## 🔄 Operações CRUD

O projeto utiliza as quatro operações fundamentais:

| Operação   | SQL      | Função           |
| ---------- | -------- | ---------------- |
| **Create** | `INSERT` | Cadastrar livro  |
| **Read**   | `SELECT` | Consultar livros |
| **Update** | `UPDATE` | Editar livro     |
| **Delete** | `DELETE` | Excluir livro    |

Fluxo básico:

```text
        ┌──────────────┐
        │    Usuário   │
        └──────┬───────┘
               │
               ▼
        ┌──────────────┐
        │   Express    │
        └──────┬───────┘
               │
               ▼
        ┌──────────────┐
        │     MySQL    │
        └──────────────┘
```

---

## 🗄️ Banco de dados

O projeto utiliza o **MySQL** para armazenar os livros.

Banco de dados:

```text
crud_livros
```

Tabela principal:

```text
livros
```

A tabela armazena as informações necessárias para identificar e apresentar cada livro cadastrado.

Exemplo conceitual:

| Campo       | Descrição              |
| ----------- | ---------------------- |
| `id`        | Identificador do livro |
| `nome`      | Título do livro        |
| `autor`     | Autor do livro         |
| `Genoro`    | Gênero do livro        |
| `Status`    | Se foi lido, seta sendo lido ou não foi lido     |
| `Qunatidade`| Quantos livros tem     |

---

## 📂 Estrutura do projeto

A estrutura atual pode ser semelhante a:

```text
crud-livros/
│
├── public/
│   └── css/
│
├── views/
│   ├── livros.ejs
│   ├── inserir.ejs
│   └── editar.ejs
│
├── server.js
├── package.json
├── package-lock.json
└── README.md
```

A estrutura pode ser modificada conforme novas funcionalidades forem adicionadas ao projeto.

---

## ⚙️ Rotas principais

Atualmente, o sistema trabalha com rotas relacionadas aos livros.

Exemplos:

```text
GET  /livros
GET  /livros/inserir
POST /livros/inserir

GET  /livros/:id/editar
POST /livros/:id/editar

POST /livros/:id/excluir
```

As rotas são responsáveis por receber as requisições, executar as operações necessárias e interagir com o banco de dados.

---

## ▶️ Como executar o projeto

### 1. Clone o repositório

```bash
git clone URL_DO_REPOSITORIO
```

Entre na pasta:

```bash
cd crud-livros
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o MySQL

Crie o banco de dados:

```sql
CREATE DATABASE crud_livros;
```

Depois, crie a tabela `livros` com os campos necessários.

### 4. Configure a conexão

Configure no projeto os dados de acesso ao MySQL:

```javascript
host: 'localhost',
user: 'root',
password: 'SUA_SENHA',
database: 'crud_livros'
```

> Não compartilhe sua senha do banco de dados em um repositório público.

### 5. Inicie o servidor

```bash
node server.js
```

Depois, acesse:

```text
http://localhost:3000/livros
```

---

## 🎯 Objetivos do projeto

O principal objetivo é utilizar um projeto real para praticar conceitos fundamentais de desenvolvimento de sistemas.

Durante o desenvolvimento, o projeto permite praticar:

* Desenvolvimento com **Node.js**
* Criação de rotas utilizando **Express**
* Utilização de **EJS**
* Integração com **MySQL**
* Comandos SQL
* Operações CRUD
* Requisições HTTP
* Formulários HTML
* Manipulação de dados
* Organização de projetos
* Git e GitHub

---

## 🔮 Próximos passos

O projeto ainda pode receber diversas melhorias.

### Funcionalidades

* [x] ➕ Cadastrar livros
* [x] 👀 Listar livros
* [x] ✏️ Editar livros
* [x] 🗑️ Excluir livros
* [ ] 🔎 Pesquisar livros
* [ ] 🏷️ Filtrar por categoria
* [ ] 📄 Adicionar paginação
* [ ] 📊 Criar dashboard
* [ ] 📱 Melhorar responsividade
* [ ] 🎨 Melhorar interface

### Melhorias técnicas

* [ ] Validação dos formulários
* [ ] Tratamento de erros
* [ ] Melhor organização das rotas
* [ ] Separação da lógica do banco de dados
* [ ] Utilização de variáveis de ambiente
* [ ] Implementação de mensagens de sucesso e erro
* [ ] Deploy da aplicação

---

## 📖 Objetivo de aprendizado

Este projeto está sendo desenvolvido como uma aplicação prática de aprendizado.

A ideia é começar com um CRUD simples de livros e, gradualmente, adicionar novas funcionalidades conforme novos conceitos forem aprendidos.

```text
Aprender
   ↓
Praticar
   ↓
Desenvolver
   ↓
Testar
   ↓
Melhorar
```

Dessa forma, o próprio projeto evolui junto com o conhecimento adquirido durante os estudos.

---

## 👨‍💻 Autor

Desenvolvido por **Math**.

Projeto criado para estudos e prática de desenvolvimento de sistemas.

---

## 📄 Licença

Este projeto está disponível para fins de estudo e aprendizado.
