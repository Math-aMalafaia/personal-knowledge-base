    import { useEffect, useState } from 'react';
    import { atualizarLivro,  buscarAutores, buscarGeneros  } from '../services/api';

    function LivroEditar({ livros, fechar, atualizarLista }) {
        const [livroSelecionado, setLivroSelecionado] = useState(livros[0] || null);
    const [nome, setNome] = useState('');
    const [autorId, setAutorId] = useState('');
    const [generoId, setGeneroId] = useState('');
    const [status, setStatus] = useState('');
    const [quantidade, setQuantidade] = useState('');

    const [autores, setAutores] = useState([]);
    const [generos, setGeneros] = useState([]);

    useEffect(() => {
        async function carregarDados(){
            try{
                const [autoresData, generosData] = await Promise.all([
                    buscarAutores(),
                    buscarGeneros()
                ]);
                setAutores(autoresData);
                setGeneros(generosData);
            } catch (error) {
                console.log('Erro ao carregar os autores',  error);
                alert('Error ao carregar os autores');
            }
        }

        carregarDados();
    }, []);

    useEffect(() => {
        if (!livroSelecionado){
            setNome('');
            setAutorId('');
            setGeneroId('');
            setStatus('');
            setQuantidade('');
            return;
        }

        setNome(livroSelecionado.nome);
        setAutorId(String(livroSelecionado.autor_id));
        setGeneroId(String(livroSelecionado.genero_id));
        setStatus(livroSelecionado.status);
        setQuantidade(livroSelecionado.qunatidade);
    }, [livroSelecionado]);

    const selecinarLivro = (id) => {
        const livro = livro.find(
            (livro) => livro.id === id
        );

        if (!livro){
            setLivroSelecionado(null)
            return;
        }

        setLivroSelecionado(livro);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!livroSelecionado) {
            return;
        }

        const livroAtualizado = {
            nome,
            autor_id: Number(autorId),
            genero_id: Number(generoId),
            status,
            quantidade: Number(quantidade)
        };

        try {
            const data = await atualizarLivro(livroSelecionado.id, livroAtualizado);

            console.log('Livro Editado', data);

            atualizarLista();
            fechar();
        } catch (error) {
            console.errer('Error ao editar livro:', error);
            alert(error.messsage || 'Erro ao editar livro, tente novamente');
        }
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
                                <select id="autor" type="text" value={autorId} onChange={(e) => setAutorId(e.target.value)} required>
                                    <option value=""> Selecione um autor</option>
                                    {autores.map((autor) => (
                                        <option key={autor.id} value={autor.id}>
                                            {autor.nome}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='campo'>
                                <label className='genero'>Gênero:</label>
                                <select id="genero" type="text" value={generoId} onChange={(e) => setGeneroId(e.target.value)} required>
                                    <option value=""> Selecione um genero</option>
                                    {generos.map((genero) => (
                                        <option key={genero.id} value={genero.id}>
                                            {genero.nome}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='campo'>
                                <label className='status'>Status:</label>
                                <select id="status" value={status} onChange={(event) => setStatus(event.target.value)}>
                                    <option value="">Selecione</option>
                                    <option value="Não lido">Não lido</option>
                                    <option value="Lendo">Lendo</option>
                                    <option value="Lido">Lido</option>
                                </select>
                            </div>
                            <div className='campo'>
                                <label className='quantidade'>Quantidade:</label>
                                <input id="quantidade" type="number" min="1" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} required />
                            </div>
                            <div className='formulario-acoes'>
                                <button type="button" className='botao botao-secundario' onClick={fechar}>Cancelar</button>
                                <button type="submit" className='botao botao-principal'>Salvar auteração</button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        );
    }

    export default LivroEditar;