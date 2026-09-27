    import { useState } from 'react';
    import { atualizarLivro } from '../services/api';

    function LivroEditar({ livros, fechar, atualizarLista }) {
        const [livroSelecionado, setLivroSelecionado] = useState(livros[0] || null);
    const [nome, setNome] = useState('');
    const [autor, setAutor] = useState('');
    const [genero, setGenero] = useState('');
    const [status, setStatus] = useState('');
    const [quantidade, setQuantidade] = useState('');

    const selecinarLivro = (id) => {
        const livro = livros.find(
            (livro) => livro.id === id
        );

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
            <div className="modal-overlay">
                <div className="modal">
                    <div className='modal-cabecalho'>
                        <div>
                        <h2 className='modal-titulo'>Editar livro</h2>
                        <p className='modal-subtitulo'>Selecione um livro para editar</p>
                        </div>
                        <button className='modal-fechar' onClick={fechar}>
                            X
                        </button>
                    </div>

                    <div className='seletor-livros'>
                        <label className='seletor-livros-titulo'>Escolhar um livro</label>
                        <div className='livros-selecao'>
                            {livros.map((livro) => (
                                <button key={livro.id} type="button" className={`livro-selecao ${livroSelecionado?.id === livro.id ? 'livro-selecao-ativo' : ''}`} onClick={() => selecinarLivro(livro.id)}>
                                    <span className='livro-selecao-titulo'>{livro.nome}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    {livroSelecionado && (
                        <form className="formulario-livro" onSubmit={handleSubmit}>
                            <div className='campo'>
                                <label className='nome'>Nome do livro</label>
                                <input id="nome" type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
                            </div>
                            <div className='campo'>
                                <label className='autor'>Autor:</label>
                                <input id="autor" type="text" value={autor} onChange={(e) => setAutor(e.target.value)} required />
                            </div>
                            <div className='campo'>
                                <label className='genero'>Gênero:</label>
                                <input id="genero" type="text" value={genero} onChange={(e) => setGenero(e.target.value)} required />
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
                                <input id="quantidade" type="number" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} required />
                            </div>
                            <div className='formulario-acoes'>
                                <button type="button" className='botao botao-secundario' onClick={fechar}>Cancelar</button>
                                <button type="submit" className='botao botao-principal'>Cadastrar Livro</button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        );
    }

    export default LivroEditar;