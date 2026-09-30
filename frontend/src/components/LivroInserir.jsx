import { useState, useEffect } from 'react';
import { cadastrarLivro, buscarAutores, buscarGeneros, cadastrarAutor, cadastrarGenero } from '../services/api';

function LivroInserir({ fechar, atualizarLista }) {
    const [nome, setNome] = useState('');
    const [autorId, setAutorId] = useState('');
    const [generoId, setGeneroId] = useState('');
    const [status, setStatus] = useState('');
    const [quantidade, setQuantidade] = useState('');

    const [autores, setAutores] = useState([]);
    const [generos, setGeneros] = useState([]);

    const [novoAutor, setNovoAutor] = useState('');
    const [novoGenero, setNovoGenero] = useState('');

    const [mostrarNovoAutor, setMostrarNovoAutor] = useState(false);
    const [mostrarNovoGenero, setMostrarNovoGenero] = useState(false);

    const [carregandoAutores, setCarregandoAutores] = useState(true);
    const [carregandoGeneros, setCarregandoGeneros] = useState(true);

    const [cadastrandoAutor, setCadastrandoAutor] = useState(false);
    const [cadastrandoGenero, setCadastrandoGenero] = useState(false);

    useEffect(() => {
    
        buscarAutores()
            .then(data => {
                setAutores(data);
            })
            .catch(error => {
                console.error('Erro ao buscar autores:', error);
                alert('Erro ao carregar os autores.');
            })
            .finally(() => {
                setCarregandoAutores(false);
            });
        
        buscarGeneros()
            .then(data => {
                setGeneros(data);
            })
            .catch(error => {
                console.error('Erro ao buscar gêneros:', error);
                alert('Erro ao carregar os gêneros.');
            })
            .finally(() => {
                setCarregandoGeneros(false);
            });
    }, []);

    const handleCadastrarAutor = async () => {

        if (!novoAutor.trim()) {
            alert('Digite o nome do autor.');
            return;
        }

        setCadastrandoAutor(true);

        try {

            const data = await cadastrarAutor(novoAutor.trim());

            const autor = data.autor;

            setAutores(prev => [...prev, autor]);

            setAutorId(String(autor.id));

            setNovoAutor('');
            setMostrarNovoAutor(false);
        } catch (error) {
            console.error('Erro ao cadastrar autor');
            alert(error.message);
        } finally {
            setCadastrandoAutor(false);
        }
    };

    const hanleCadastrarGenero = async () => {
        
        if (!novoGenero.trim()) {
            alert('Digite o nome do gênero');
            return;
        }

        setCadastrandoGenero(true);

        try {

            const data = await cadastrarGenero(novoGenero.trim());

            const genero = data.genero;

            setGeneros(prev => [...prev, genero]); 

            setGeneroId(String(genero.id));

            setNovoGenero('');
            setMostrarNovoGenero(false)
        } catch (error) {
            console.error('Erro ao cadastrar autor');
            alert(error.message);
        } finally {
            setCadastrandoGenero(false);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const livro = {
            nome: nome,
            autor_id: Number(autorId),
            genero_id: Number(generoId),
            status: status,
            quantidade: Number(quantidade)
        };

        console.log('Livro que será enviado:', livro);

        try {

            const data = await cadastrarLivro(livro);

            console.log('Livro inserido:', data);

            atualizarLista();
            fechar();
        } catch (error) {
            console.error('Erro ao inserir livro', error);

            alert(`Erro ao inserir livro. Por favor, tente novamente, ${error.message}`);
        }
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
                        <select id="autor" value={autorId} onChange={(e) => setAutorId(e.target.value)} required>
                            <option value="">
                                {carregandoAutores 
                                    ? 'Carregando autores...' 
                                    : 'Selecione o autor'}
                            </option>
                            {!carregandoAutores && autores.map((autor) => (
                                <option key={autor.id} value={autor.id}>
                                    {autor.nome}
                                </option>
                            ))}
                        </select>

                        {!mostrarNovoAutor &&(
                            <button type="button" className="botao botao-secundario" onClick={() => setMostrarNovoAutor(true)}>
                                + Cadastrar novo autor
                            </button>
                        )}
                        
                        {mostrarNovoAutor &&(
                            <div className='novo-cadastro'>
                                <input type="text" value={novoAutor} onChange={(e) => setNovoAutor(e.target.value)} placeholder="Digite o nome do novo autor"/>

                                <div className='novo-cadastro-acoes'>
                                    <button type="button" className="botao botao-secundario" onClick={() => {
                                        setNovoAutor('');
                                        setMostrarNovoAutor(false);
                                    }}>
                                        Cancelar
                                    </button>

                                    <button type="button" className="botao botao-principal" onClick={handleCadastrarAutor} disabled={cadastrandoAutor}>
                                        {cadastrandoAutor
                                            ? 'Cadastrando...'
                                            : 'Cadastrar autor'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='campo'>
                        <label className='genero'>Gênero:</label>
                        <select id="genero" value={generoId} onChange={(e) => setGeneroId(e.target.value)} required>
                            <option value="">
                                {carregandoGeneros
                                    ? 'Carregando gêneros...'
                                    : 'Selecione o gênero'}
                            </option>
                            {!carregandoGeneros && generos.map((genero) => (
                                <option key={genero.id} value={genero.id}>
                                    {genero.nome}
                                </option>
                            ))}
                        </select>

                        {!mostrarNovoGenero &&(
                            <button type="button" className='botao botao-secundario' onClick={() => setMostrarNovoGenero(true)}>
                                + Cadastrar novo gênero
                            </button>
                        )}

                        {mostrarNovoGenero &&(
                            <div className='novo-cadastro'>
                                <input type="text" value={novoGenero} onChange={(e) => setNovoGenero(e.target.value)} placeholder="Digite o nome do novo Gênero"/>
                                <div>
                                    <button type="button" className="botao botao-secundario" onClick={() => {
                                        setNovoGenero('');
                                        setMostrarNovoGenero(false);
                                    }}>
                                        cancelar
                                    </button>

                                    <button type='button' className="botao botao-principal" onClick={hanleCadastrarGenero} disabled={cadastrandoGenero}>
                                        {cadastrandoGenero
                                            ? 'Cadastrando...'
                                            : 'Cadastrar Gênero'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='campo'>
                        <label className='status'>Status:</label>
                        <select id="status" value={status} onChange={(event) => setStatus(event.target.value)}>
                            <option value="">Selecione</option>
                            <option value="Não lido">Não lido</option>
                            <option value="lendo">Lendo</option>
                            <option value="Lido">Lido</option>
                        </select>
                    </div>
                    <div className='campo'>
                        <label className='quantidade'>Quantidade:</label>
                        <input id="quantidade" type="number" value={quantidade} min="1" onChange={(e) => setQuantidade(e.target.value)} placeholder="Digite a quantidade de livros" required />
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