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
        <div className='modal-overlay'>
            <div className='modal'>
                <div className='modal-cabecalho'>
                    <div>  
                        <h2 className='modal-titulo'>Cadastrar livro</h2>
                        <p className='modal-subtitulo'>Preencha os campos abaixo para cadastrar um novo livro.</p>
                    </div>
                    <button className='modal-fechar' onClick={fechar}>
                        X
                    </button>
                </div>

                <form className='formulario-livro' onSubmit={handleSubmit}>
                    <div className='campo'>
                        <label className='nome'>Nome do livro</label>
                        <input id="nome" type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Digite o nome do livro" required />
                    </div>
                    <div className='campo'>
                        <label className='autor'>Autor:</label>
                        <input id="autor" type="text" value={autor} onChange={(e) => setAutor(e.target.value)} placeholder="Digite o nome do autor" required />
                    </div>
                    <div className='campo'>
                        <label className='genero'>Gênero:</label>
                        <input id="genero" type="text" value={genero} onChange={(e) => setGenero(e.target.value)} placeholder="Digite o gênero do livro" required />
                    </div>
                    <div className='campo'>
                        <label className='status'>Status:</label>
                        <select id="status" value={status} onChange={(event) => setStatus(event.target.value)}>
                            <option value="">Selecione</option>
                            <option value="Nâo lido">Não lido</option>
                            <option value="Lendo">Lendo</option>
                            <option value="Lido">Lido</option>
                        </select>
                    </div>
                    <div className='campo'>
                        <label className='quantidade'>Quantidade:</label>
                        <input id="quantidade" type="number" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} placeholder="Digite a quantidade de livros" required />
                    </div>
                    <div className='formulario-acoes'>
                        <button type="button" className='botao botao-secundario' onClick={fechar}>Cancelar</button>
                        <button type="submit" className='botao botao-principal'>Cadastrar Livro</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LivroInserir;