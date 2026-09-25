import { useState } from 'react';
import { atualizarLivro } from '../services/api';

function LivroEditar({ livros, fechar, atualizarLista }) {
    const [livroSelecionado, setLivroSelecionado] = useState(livros[0] || null);
  const [nome, setNome] = useState('');
  const [autor, setAutor] = useState('');
  const [genero, setGenero] = useState('');
  const [status, setStatus] = useState('');
  const [quantidade, setQuantidade] = useState('');

  const selecinarLivro = (event) => {
    const id = Number(event.target.value);

    const livro = livros.find((livro) => livro.id === id)

    if (!livro){
        setLivroSelecionado(null);
        return;
    }

    setLivroSelecionado(livro);

    setNome(livro.nome);
    setAutor(livro.autor);
    setGenero(livro.genero);
    setStatus(livro.status);
    setQuantidade(livro.quantidade);

  };

    const handleSubmit = (event) => {
        event.preventDefault();

        const Livro = {
            nome,
            autor,
            genero,
            status,
            quantidade
        };

        atualizarLivro(livroSelecionado.id, Livro)
        .then(data => {
            console.log('Livro Editado:', data);
            alert('Livro editado com sucesso!');

            atualizarLista();
            fechar();
        })
        .catch(error => {
            console.error('Erro ao editar livro:', error);
            alert('Erro ao editar livro. Por favor, tente novamente.');
        });
    };

    return (
        <div>
            <div>
                <h2>Editar livro</h2>
                <button onClick={fechar}>
                    X
                </button>
            </div>

            <div>
                <label>Escolhar um livro</label>
                <select value={livroSelecionado ? livroSelecionado.id : ''} onChange={selecinarLivro}>
                    <option value="">Selecione um Livro</option>
                    {livros.map((livro) => (
                        <option key={livro.id} value={livro.id}>
                            {livro.nome}
                        </option>
                    ))}
                </select>
            </div>
            {livroSelecionado && (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Nome:</label>
                        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
                    </div>
                    <div>
                        <label>Autor:</label>
                        <input type="text" value={autor} onChange={(e) => setAutor(e.target.value)} required />
                    </div>
                    <div>
                        <label>Gênero:</label>
                        <input type="text" value={genero} onChange={(e) => setGenero(e.target.value)} required />
                    </div>
                    <div>
                        <label>Status:</label>
                        <select value={status} onChange={(event) => setStatus(event.target.value)}>
                            <option value="">Selecione</option>
                            <option value="Nâo lido">Não lido</option>
                            <option value="Lendo">Lendo</option>
                            <option value="Lido">Lido</option>
                        </select>
                    </div>
                    <div>
                        <label>Quantidade:</label>
                        <input type="number" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} required />
                    </div>
                    <button type="submit">Cadastrar Livro</button>
                </form>
            )}
        </div>
    );
}

export default LivroEditar;