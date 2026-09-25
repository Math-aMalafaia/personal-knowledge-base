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
    <div className="biblioteca">

      <header className='biblioteca-cabecalho'>
        <div className='biblioteca-identidade'>
          <h1 className='biblioteca-titulo'>A Grande Biblioteca</h1>
          <p className='biblioteca-subtitilo'>Bem-vindo à nossa biblioteca virtual!</p>
        </div>
      </header>


      <main className='biblioteca-conteudo'>

        <div className='biblioteca-acoes'>
          <h2 className='biblioteca-acoes-titulo'>Minha Estante</h2>
          <div className='biblioteca-botoes'>
            <button className='botao botao-principal' onClick={() =>setMostrarCadastro(true)}>cadastrar Livro</button>
            <button className='botao botao-secundario' onClick={() =>setMostrarEdicao(true)}>Editar</button>
            <button className='botao botao-perigo' onClick={() =>setMostrarExclusao(true)}>Excluir</button>
          </div>
        </div>

        <section classname='estante'>

          {livros.length === 0 ? (
            <div className='estante-vazia'>
              <p>sua estannte esat vazia. Cadestre seu primeiro livro para começar a biblioteca.</p>
            </div>
          ) : (
            <div className='prateleira'>
              {livros.map((livro) => (
                <article classname='livro' key={livro.id}>

                  <div classeName='livro-capa'>
                    <h3 className='livro-titulo'>{livro.nome}</h3>
                  </div>
                  <div className='livro-informacoes'>
                    <p className='livro-autor'>{livro.autor}</p>
                    <p className='livro-geenero'>{livro.genero}</p>
                    <p className='livro-status'>{livro.status}</p>
                    <p className='livro-quantidade'>Quantidade: {livro.quantidade}</p>
                  </div>
                </article>
              ))}
            </div>
        )}
        </section>
        
      </main>

      {mostrarCadastro && <LivroInserir fechar={() => setMostrarCadastro(false)} atualizarLista={carrgarLivros} />}
      {mostrarEdicao && <LivroEditar livros={livros} fechar={() => setMostrarEdicao(false)} atualizarLista={carrgarLivros} />} 
      {mostrarExclusao && <LivroExcluir livros={livros} fechar={() => setMostrarExclusao(false)} atualizarLista={carrgarLivros} />}
    </div>
  );
}

export default LivroLista;