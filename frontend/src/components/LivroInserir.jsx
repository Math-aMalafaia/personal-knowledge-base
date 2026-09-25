import { useState } from 'react';
import { cadastrarLivro } from '../services/api';

function LivroInserir({ fechar, atualizarLista }) {
    const [nome, setNome] = useState('');
    const [autor, setAutor] = useState('');
    const [genero, setGenero] = useState('');
    const [status, setStatus] = useState('');
    const [quantidade, setQuantidade] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const Livro = {
            nome: nome,
            autor: autor,
            genero: genero,
            status: status,
            quantidade: Number(quantidade)
        };

        cadastrarLivro(Livro)
        .then(data => {
            console.log('Livro inserido:', data);
            alert('Livro inserido com sucesso!');

            atualizarLista();
            fechar();
        })
        .catch(error => {
            console.error('Erro ao inserir livro:', error);
            alert('Erro ao inserir livro. Por favor, tente novamente.');
        });
    };

    return (
        <div>
            <div>
                <h2>Cadastrar livro</h2>
                <button onClick={fechar}>
                    X
                </button>
            </div>
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
        </div>
    );
}

export default LivroInserir;