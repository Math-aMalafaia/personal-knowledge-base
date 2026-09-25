import { useState } from 'react';

function LivroEditar() {
  const [nome, setNome] = useState('');
  const [autor, setAutor] = useState('');
  const [genero, setGenero] = useState('');
  const [status, setStatus] = useState('');
  const [quantidade, setQuantidade] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const Livro = {
            nome,
            autor,
            genero,
            status,
            quantidade
        };

        fetch('http://localhost:3000/api/livros/inserir', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Livro)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Livro Editado:', data);
            alert('Livro editado com sucesso!');

            setNome('');
            setAutor('');
            setGenero('');
            setStatus('');
            setQuantidade('');
        })
        .catch(error => {
            console.error('Erro ao editar livro:', error);
            alert('Erro ao editar livro. Por favor, tente novamente.');
        });
    };

    return (
        <div>
            <h2>Editar livro</h2>
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

export default LivroEditar;