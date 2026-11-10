import {useEffect, useState } from 'react';
import { buscarLivros, buscarEstatisticas } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import LivroInserir from './LivroInserir';
import LivroEditar from './LivroEditar';
import LivroExcluir from './LivroExcluir';
import LivroDetalhes from './LivroDetalhes';

function LivroLista() {
  const [livros, setLivros] = useState([]);
  const [estatisticas, setEstatisticas] = useState({
    total: 0,
    lidos: 0,
    naoLidos: 0,
    lendo: 0
  });
  const [mostrarCadastro, setMostrarCadastro] = useState(false);
  const [mostrarEdicao, setMostrarEdicao] = useState(false);
  const [mostrarExclusao, setMostrarExclusao] = useState(false);
  const [livroSelecionado, setLivroSelecionado] = useState(null);

  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const sair = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Erro ao sair:', error);
    }
  };

  const carregarLivros = () => {
    Promise.all([
      buscarLivros(),
      buscarEstatisticas()
    ])
    .then(([livrosData, estatisticasData]) => {
      setLivros(livrosData);
      setEstatisticas(estatisticasData);
    })
    .catch(error => {
      console.error('Erro ao buscar dados da biblioteca:', error);
    });
  };

  useEffect(() => {
    carregarLivros();
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
          <p className='biblioteca-subtitulo'>
            Bem-vindo, {usuario?.nome || 'usuário'}!
          </p>
        </div>

        <button className='botao botao-perigo'onClick={sair}>
          Sair
        </button>
      </header>


      <main className='biblioteca-conteudo'>

        <section className='estatisticas'>
          <div className='estatistica'>
            <span className='estatistica-label'>Total de livros</span>
            <strong className='estatistica-valor'>{estatisticas.total}</strong>
          </div>
          <div className='estatistica'>
            <span className='estatistica-label'>Livros lidos</span>
            <strong className='estatistica-valor'>{estatisticas.lidos}</strong>
          </div>
          <div className='estatistica'>
            <span className='estatistica-label'>Livros não lidos</span>
            <strong className='estatistica-valor'>{estatisticas.naoLidos}</strong>
          </div>
          <div className='estatistica'>
            <span className='estatistica-label'>Livros lendo</span>
            <strong className='estatistica-valor'>{estatisticas.lendo}</strong>
          </div>
        </section>

        <div className='biblioteca-acoes'>
          <h2 className='biblioteca-acoes-titulo'>Minha Estante</h2>
          <div className='biblioteca-botoes'>
            <button className='botao botao-principal' onClick={() =>setMostrarCadastro(true)}>cadastrar Livro</button>
            <button className='botao botao-secundario' onClick={() =>setMostrarEdicao(true)}>Editar</button>
            <button className='botao botao-perigo' onClick={() =>setMostrarExclusao(true)}>Excluir</button>
          </div>
        </div>

        <section className='estante'>

          {livros.length === 0 ? (
            <div className='estante-vazia'>
              <p>sua estannte esat vazia. Cadestre seu primeiro livro para começar a biblioteca.</p>
            </div>
          ) : (
            <div className='prateleira'>
              {livros.map((livro) => (
                <button className="livro" key={livro.id} onClick={() => abrirDetalhes(livro)} style={{'--livro-cor': obterCorLivro(livro.id)}}>
                  <span className="livro-titulo">{livro.nome}</span>
                </button>
              ))}
            </div>
        )}
        </section>
        
      </main>

      {mostrarCadastro && <LivroInserir fechar={() => setMostrarCadastro(false)} atualizarLista={carregarLivros} />}
      {mostrarEdicao && <LivroEditar livros={livros} fechar={() => setMostrarEdicao(false)} atualizarLista={carregarLivros} />} 
      {mostrarExclusao && <LivroExcluir livros={livros} fechar={() => setMostrarExclusao(false)} atualizarLista={carregarLivros} />}
      {livroSelecionado && <LivroDetalhes livro={livroSelecionado} fechar={fecharDetalhes} editar={abrirEdicao} excluir={abrirExclusao}/>}
    </div>
  );
}

export default LivroLista;