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

export async function deletarLivro(id){
    const response = await fetch(`${API_URL}/api/livros/${id}`, {
        method: 'DELETE',
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || 'Erro ao deletar livro');
    }

    return data;
}

export async function buscarEstatisticas(){
    const response = await fetch(`${API_URL}/api/livros/estatisticas`);

    if (!response.ok){
        throw new Error('Erro ao buscar estatisticas dos livros')
    }

    return response.json();
}

export async function buscarAutores() {
    const response = await fetch(`${API_URL}/api/autores`);

    if (!response.ok){
        throw new Error('Erro ao buscar autores');
    }
    return response.json();
}

export async function cadastrarAutor(nome){
    
    const response = await fetch(`${API_URL}/api/autores`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({nome})
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || 'Erro ao cadastrar autor')
    }

    return data;
}

export async function buscarGeneros(){
    const response = await fetch(`${API_URL}/api/generos`);

    if(!response.ok){
        throw new Error('Erro ao buscar generos');
    }
    const data = await response.json();
    return data;
}

export async function cadastrarGenero(nome){

    const response = await fetch(`${API_URL}/api/generos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({nome})
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || 'Erro ao cadasstrar gênero')
    }

    return data;
}