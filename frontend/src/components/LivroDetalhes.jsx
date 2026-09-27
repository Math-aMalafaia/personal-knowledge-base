
function LivroDetalhes({ livro, fechar, editar, excluir }) {



  return (
    <div className="modal-overlay">
      <div className="modal modal-detalhes">
        <div className="modal-cabecalho">
          <div>
            <h2 className="modal-titulo">Detalhes do livro</h2>
            <p className="modal-subtitulo">Informações da sua coleção.</p>
          </div>
          <button className="modal-fechar" onClick={fechar}>×</button>
        </div>

        <div className="detalhes-livro">

          <div className="detalhes-informacoes">
            <div className="detalhe-item">
              <span>Nome do livro: </span>
              <strong>{livro.nome}</strong>
            </div>
            <div className="detalhe-item">
              <span>Autor do livro: </span>
              <strong>{livro.autor}</strong>
            </div>
            <div className="detalhe-item">
              <span>Gênero do livro: </span>
              <strong>{livro.genero}</strong>
            </div>
            <div className="detalhe-item">
              <span>Status: </span>
              <strong>{livro.status}</strong>
            </div>
            <div className="detalhe-item">
              <span>Quantidade: </span>
              <strong>
                {livro.quantidade} exemplar(es)
              </strong>
            </div>
          </div>
        </div>

        <div className="formulario-acoes">

          <button type="button" className="botao botao-secundario" onClick={editar}>
            Editar
          </button>

          <button type="button" className="botao botao-perigo" onClick={excluir}>
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}

export default LivroDetalhes;