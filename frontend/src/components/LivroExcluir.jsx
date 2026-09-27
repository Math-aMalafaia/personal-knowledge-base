import { useState } from 'react';
import { deletarLivro } from '../services/api';

function LivroExcluir({livros, fechar, atualizarLista}) {
    const [livroSelecionado, setLivroSelecionado] = useState(null);
    const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);

    const selecionarLivro = (id) => {
        const livro = livros.find((livro) => livro.id === id);
        if (!livro) {
            setLivroSelecionado(null);
            setMostrarConfirmacao(false);
            return;
        }
        setLivroSelecionado(livro);
        setMostrarConfirmacao(true);
    };
    
    const cancelarExclusao = () => {
        setMostrarConfirmacao(false);
    };

    const confirmarExclusao = () => {

        if (!livroSelecionado) {
            return;
        }
        deletarLivro(livroSelecionado.id)
        .then(data => {
            console.log(data)

            atualizarLista();
            fechar();
        })
        .catch(error => {
            console.log('Erro ao excluir o livro:', error);
            alert('Erro ao excluir o livro. Por favor, tente novamente.');
        });
    };

    return (
        <div className='modal-overlay'>
            <div className='modal'>
                <div className='modal-cabecalho'>
                    <h2 className='modal-titulo'>Excluir livro</h2>
                    <p className='modal-subtitulo'>Selecione o livro que deseja remover da biblioteca.</p>
                    <button className='modal-fechar' onClick={fechar}>
                        X
                    </button>
                </div>

            <div className='seletor-livros'>
                <label className='seletor-livros-titulo'>Escolha um Livro</label>
                <div className='livros-selecao'>
                    {livros.map((livro) => (
                        <button key={livro.id} type="button" className={`livro-selecao ${livroSelecionado?.id === livro.id ? 'livro-selecao-ativo' : ''}`} onClick={() => selecionarLivro(livro.id)}>
                            <span className='livro-selecao-titulo'>{livro.nome}</span>
                        </button>
                    ))}
                </div>
            </div>
            
            {livroSelecionado && (
                <div className='livro-selecionado-info'>
                    <span>Livro selecionado</span>
                    <strong>{livroSelecionado.nome}</strong>
                </div>
            )}

            {mostrarConfirmacao && livroSelecionado && (
                <div className='confirmacao-exclusao'>
                    <div className='confirmacao-icone'>
                        !
                    </div>
                    <div className='Confirmacao-conteudo'>
                        <h3>Atenção</h3>
                        <p>Você está prestes a excluir o livro <strong>{livroSelecionado.nome}</strong>.</p>
                        <p>Essa ação não pode ser desfeita</p>
                    </div>
                </div>
            )}
                <div className='formulario-acoes'>
                    <button type="button" className="botao botao-secundario" onClick={mostrarConfirmacao ? cancelarExclusao : fechar}>
                        Cancelar
                    </button>
                    <button type="button" className="botao botao-principal" disabled={!livroSelecionado} onClick={confirmarExclusao}>
                        Excluir livro
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LivroExcluir;