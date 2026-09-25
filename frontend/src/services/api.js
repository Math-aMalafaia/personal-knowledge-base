const API_URL = 'http://localhost:3000';

export async function buscarLivros() {
    const response = await fetch(`${API_URL}/api/livros`);
    if (!response.ok) {
        throw new Error('Erro ao buscar livros');
    }
    return response.json();
}

export async function cadastrarLivro(livro) {
    const response = await fetch(`${API_URL}/api/livros/inserir`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(livro)
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || 'Erro ao cadastrar livro');
    }

    return data;
}

export async function atualizarLivro(id, livro) {
    const response = await fetch(`${API_URL}/api/livros/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(livro)
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || 'Erro ao atualizar livro');
    }

    return data;
}

export async function deletarLivro(id, livro){
    const response = await fetch(`${API_URL}/api/livros/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(livro)
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || 'Erro ao deletar livro');
    }

    return data;
}