import {useEffect, useState } from 'react';
import { buscarLivros } from '../services/api';
import LivroInserir from './LivroInserir';
import LivroEditar from './LivroEditar';
import LivroExcluir from './LivroExcluir';

function LivroLista() {
  const [livros, setLivros] = useState([]);
  const [mostrarCadastro, setMostrarCadastro] = useState(false);
  const [mostrarEdicao, setMostrarEdicao] = useState(false);
  const [mostrarExclusao, setMostrarExclusao] = useState(false);

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
        <button onClick={() =>setMostrarEdicao(true)}>Editar</button>
        <button onClick={() =>setMostrarExclusao(true)}>Excluir</button>
      </div>

      {mostrarCadastro && <LivroInserir fechar={() => setMostrarCadastro(false)} atualizarLista={carrgarLivros} />}
      {mostrarEdicao && <LivroEditar livros={livros} fechar={() => setMostrarEdicao(false)} atualizarLista={carrgarLivros} />} 
      {mostrarExclusao && <LivroExcluir livros={livros} fechar={() => setMostrarExclusao(false)} atualizarLista={carrgarLivros} />}
    </div>
  );
}

export default LivroLista;