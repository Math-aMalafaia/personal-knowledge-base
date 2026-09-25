import {useEffect, useState } from 'react';
import { buscarLivros } from '../services/api';
import LivroInserir from './LivroInserir';

function LivroLista() {
  const [livros, setLivros] = useState([]);
  const [mostrarCadastro, setMostrarCadastro] = useState(false);

  const carrgarLivros = () => {
    buscarLivros()
    .then(data => {
      setLivros(data);
    })
    .catch(error => {
      console.error('Erro ao buscar livros:', error);
    });
  }

  useEffect(() => {
    carrgarLivros();
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

          <hr/>
        </div>
      ))}

      <div>
        <button onClick={() =>setMostrarCadastro(true)}>cadastrar Livro</button>
        <button>Editar</button>
        <button>Excluir</button>
      </div>

      {mostrarCadastro && <LivroInserir fechar={() => setMostrarCadastro(false)} atualizarLista={carrgarLivros} />}
    </div>
  );
}

export default LivroLista;