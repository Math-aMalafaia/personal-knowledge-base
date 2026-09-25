import { useState } from 'react';

function LivroExcluir() {
    const [nome, setNome] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`http://localhost:3000/api/livros/${nome}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log('Livro excluído:', data);
            alert('Livro excluído com sucesso!');
            setNome('');
        })
        .catch(error => {
            console.error('Erro ao excluir livro:', error);
            alert('Erro ao excluir livro. Por favor, tente novamente.');
        });
    };

    return (
        <div>
            <h2>Excluir livro</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome:</label>
                    <input type="text" value={nome} onChange={(event) => setNome(event.target.value)} required />
                </div>
                <button type="submit">Excluir</button>
            </form>
        </div>
    );
}

export default LivroExcluir;