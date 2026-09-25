import {useEffect, useState } from 'react';

function LivroLista() {
  const [livros, setLivros] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/livros')
      .then(response => response.json())
    .then(data => {
        setLivros(data);
      })
      .catch(error => {
        console.error('Erro ao buscar livros:', error);
      });
  }, []);

  return (
    <div>
      <h2>Lista de livros</h2>
      {livros.map((livro) => (
        <div key={livro.id}>
          <h3>{livro.nome}</h3>
          <p>Autor: {livro.autor}</p>
          <p>Gênero: {livro.genero}</p>
          <p>Status: {livro.status}</p>
          <p>Quantidade: {livro.quantidade}</p>
        </div>
      ))}

      <div>
        <button>Editar</button>
        <button>Excluir</button>
        <button>cadastrar</button>
      </div>
    </div>
  );
}

export default LivroLista;