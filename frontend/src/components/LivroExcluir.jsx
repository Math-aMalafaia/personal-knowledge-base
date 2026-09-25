import { useState } from 'react';
import { deletarLivro } from '../services/api';

function LivroExcluir({livros, fechar, atualizarLista}) {
    const [livroSelecionado, setLivroSelecionado] = useState(null);
    const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);

    const selecionarLivro = (event) => {
        const id = Number(event.target.value);
        const livro = livros.find((livro) => livro.id === id);
        if (!livro) {
            setLivroSelecionado(null);
            setMostrarConfirmacao(false);
            return;
        }
        setLivroSelecionado(livro);
        setMostrarConfirmacao(true);
    };

    const confirmarExclusao = () => {
        deletarLivro(livroSelecionado.id)
        .then(data => {
            console.log(data)

            alert('Livro excluído com sucesso!');

            atualizarLista();
            fechar();
        })
        .catch(error => {
            console.log('Erro ao excluir o livro:', error);
            alert('Erro ao excluir o livro. Por favor, tente novamente.');
        });
    };

    return (
        <div>
            <div>
                <h2>Excluir livro</h2>
                <button onClick={fechar}>
                    X
                </button>
            </div>

            <div>
                <label> Escolhar um Livro</label>
                <select value={livroSelecionado ? livroSelecionado.id : ''} onChange={selecionarLivro}>
                    <option value="">Selecione um livro</option>
                    {livros.map((livro) => (
                        <option key={livro.id} value={livro.id}>
                            {livro.nome}
                        </option>
                    ))}
                </select>
            </div>
            
            {livroSelecionado && !mostrarConfirmacao && (
                <div>
                    <h3>Livro selecionando</h3>
                    <p>
                        <strong>Nome:</strong> {livroSelecionado.nome}
                    </p>

                    <p>
                        <strong>Autor:</strong> {livroSelecionado.autor}
                    </p>

                    <p>
                        <strong>Gênero:</strong> {livroSelecionado.genero}
                    </p>

                    <p>
                        <strong>Status:</strong> {livroSelecionado.status}
                    </p>

                    <p>
                        <strong>Quantidade:</strong> {livroSelecionado.quantidade}
                    </p>

                    <button onClick={() => setMostrarConfirmacao(true)}>Excluir este Livro</button>
                </div>
            )}

            {livroSelecionado && mostrarConfirmacao && (
                <div>
                    <h3>Confirmação de exclusão</h3>
                    <p>Tem certeza que deseja excluir o livro "{livroSelecionado.nome}"?</p>
                    <button onClick={confirmarExclusao}>
                        Sim, Excluir.
                    </button>
                    <button onClick={() => setMostrarConfirmacao(false)}>
                        Cancelar
                    </button>
                </div>
            )}
        </div>
    );
}

export default LivroExcluir;