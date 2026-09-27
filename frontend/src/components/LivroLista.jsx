import {useEffect, useState } from 'react';
import { buscarLivros } from '../services/api';
import LivroInserir from './LivroInserir';
import LivroEditar from './LivroEditar';
import LivroExcluir from './LivroExcluir';
import LivroDetalhes from './LivroDetalhes';

function LivroLista() {
  const [livros, setLivros] = useState([]);
  const [mostrarCadastro, setMostrarCadastro] = useState(false);
  const [mostrarEdicao, setMostrarEdicao] = useState(false);
  const [mostrarExclusao, setMostrarExclusao] = useState(false);
  const [livroSelecionado, setLivroSelecionado] = useState(null);

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

  const coresLivros = [
    '#70472f',
    '#385a4a',
    '#4b536f',
    '#6b4358',
    '#80613d',
    '#594b70',
    '#7a4938',
    '#3f5f69'
  ];

  const obterCorLivro = (id) => {
    return coresLivros[id % coresLivros.length];
  };

  const abrirDetalhes = (livro) => {
    setLivroSelecionado(livro);
  };

  const fecharDetalhes = () => {
    setLivroSelecionado(null);
  };

  const abrirEdicao = () => {
    setLivroSelecionado(null);
    setMostrarEdicao(true);
  };

  const abrirExclusao = () => {
    setLivroSelecionado(null);
    setMostrarExclusao(true);
  };

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
                <button className="livro" key={livro.id} onClick={() => abrirDetalhes(livro)} styler={{'--livro-cor': obterCorLivro(livro.id)}}>
                  <span className="livro-titulo">{livro.nome}</span>
                </button>
              ))}
            </div>
        )}
        </section>
        
      </main>

      {mostrarCadastro && <LivroInserir fechar={() => setMostrarCadastro(false)} atualizarLista={carrgarLivros} />}
      {mostrarEdicao && <LivroEditar livros={livros} fechar={() => setMostrarEdicao(false)} atualizarLista={carrgarLivros} />} 
      {mostrarExclusao && <LivroExcluir livros={livros} fechar={() => setMostrarExclusao(false)} atualizarLista={carrgarLivros} />}
      {livroSelecionado && <LivroDetalhes livro={livroSelecionado} fechar={fecharDetalhes} editar={abrirEdicao} excluir={abrirExclusao}/>}
    </div>
  );
}

export default LivroLista;