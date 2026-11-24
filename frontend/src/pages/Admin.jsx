import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    buscarUsuariosAdmin,
    buscarUsuarioAdmin,
    buscarLogsUsuarioAdmin
} from '../services/api';
import './Admin.css';

// Formata a data para o padrão brasileiro
function formatarData(data) {
    if (!data) return '—';

    return String(data)
        .slice(0, 10)
        .split('-')
        .reverse()
        .join('/');
}

function Admin() {
    const { usuario } = useAuth();

    // Estados da listagem
    const [usuarios, setUsuarios] = useState([]);
    const [carregandoUsuarios, setCarregandoUsuarios] = useState(true);
    const [erroUsuarios, setErroUsuarios] = useState('');

    // Estados dos detalhes
    const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
    const [carregandoDetalhes, setCarregandoDetalhes] = useState(false);
    const [erroDetalhes, setErroDetalhes] = useState('');

    // Estados das atividades
    const [atividades, setAtividades] = useState([]);
    const [carregandoAtividades, setCarregandoAtividades] = useState(false);
    const [erroAtividades, setErroAtividades] = useState('');
    const [totalAtividades, setTotalAtividades] = useState(0);
    const [atividadesConsultadas, setAtividadesConsultadas] = useState(false);

    // Estados dos filtros de atividades
    const [filtroAcao, setFiltroAcao] = useState('');
    const [dataInicial, setDataInicial] = useState('');
    const [dataFinal, setDataFinal] = useState('');

    // Carregar usuários
    const carregarUsuarios = useCallback(async () => {
        try {
            setCarregandoUsuarios(true);
            setErroUsuarios('');

            const dados = await buscarUsuariosAdmin();
            setUsuarios(dados);

        } catch (error) {
            console.error('Erro ao carregar usuários:', error);
            setErroUsuarios(error.message);

        } finally {
            setCarregandoUsuarios(false);
        }
    }, []);

    // Consultar usuário individual
    async function consultarUsuario(id) {
        try {
            setCarregandoDetalhes(true);
            setErroDetalhes('');
            setUsuarioSelecionado(null);

            // Limpar atividades do usuário anterior
            setAtividades([]);
            setErroAtividades('');
            setTotalAtividades(0);
            setAtividadesConsultadas(false);
            setFiltroAcao('');
            setDataInicial('');
            setDataFinal('');

            const dados = await buscarUsuarioAdmin(id);
            setUsuarioSelecionado(dados);

        } catch (error) {
            console.error('Erro ao consultar usuário:', error);
            setErroDetalhes(error.message);

        } finally {
            setCarregandoDetalhes(false);
        }
    }

    // Consultar atividades do usuário
    async function consultarAtividades(id) {
        try {
            setCarregandoAtividades(true);
            setErroAtividades('');
            setAtividades([]);
            setTotalAtividades(0);
            setAtividadesConsultadas(true);

            const dados = await buscarLogsUsuarioAdmin(id);

            setAtividades(dados.atividades || []);
            setTotalAtividades(dados.total || 0);

        } catch (error) {
            console.error('Erro ao consultar atividades:', error);
            setErroAtividades(error.message);

        } finally {
            setCarregandoAtividades(false);
        }
    }

    // Executar carregamento ao abrir o painel
    useEffect(() => {
        Promise.resolve().then(() => {
            carregarUsuarios();
        });
    }, [carregarUsuarios]);

    // Aplicar filtros ao histórico de atividades
    const atividadesFiltradas = atividades.filter((item) => {

        const correspondeAcao =
            !filtroAcao || item.acao === filtroAcao;

        const dataAtividade = item.data_hora
            ? String(item.data_hora).slice(0, 10)
            : '';

        const correspondeDataInicial =
            !dataInicial || dataAtividade >= dataInicial;

        const correspondeDataFinal =
            !dataFinal || dataAtividade <= dataFinal;

        return (
            correspondeAcao &&
            correspondeDataInicial &&
            correspondeDataFinal
        );
    });

    // Obter as ações existentes no histórico
    const tiposDeAcao = [
        ...new Set(atividades.map((item) => item.acao).filter(Boolean))
    ].sort();

    return (
        <div className="admin-container">

            {/* CABEÇALHO */}
            <header className="admin-header">
                <div className="admin-identidade">
                    <h1>A Grande Biblioteca</h1>
                    <span>Painel Administrativo</span>
                </div>

                <div className="admin-usuario">
                    <span>{usuario?.nome}</span>
                    <span className="admin-role">Administrador</span>
                </div>
            </header>

            <div className="admin-layout">

                {/* MENU LATERAL */}
                <aside className="admin-sidebar">
                    <h2>Administração</h2>

                    <nav className="admin-menu">
                        <Link to="/admin" className="admin-menu-ativo">
                            <span>▦</span>
                            Visão geral
                        </Link>

                        <div className="admin-menu-item">
                            <span>♙</span>
                            Usuários
                        </div>

                        <div className="admin-menu-item">
                            <span>▤</span>
                            Auditoria
                        </div>

                        <Link to="/biblioteca" className="admin-menu-item">
                            <span>▣</span>
                            Biblioteca
                        </Link>
                    </nav>
                </aside>

                {/* CONTEÚDO */}
                <main className="admin-content">

                    <div className="admin-boas-vindas">
                        <h2>Visão geral</h2>
                        <p>
                            Bem-vindo ao painel de administração,
                            {' '}{usuario?.nome}.
                        </p>
                    </div>

                    {/* CARDS */}
                    <section className="admin-cards">

                        <article className="admin-card">
                            <span className="admin-card-icone">♙</span>
                            <h3>Usuários</h3>
                            <p>
                                Consulte e gerencie as contas
                                cadastradas no sistema.
                            </p>
                            <span className="admin-card-status">
                                Em desenvolvimento
                            </span>
                        </article>

                        <article className="admin-card">
                            <span className="admin-card-icone">▤</span>
                            <h3>Auditoria</h3>
                            <p>
                                Acompanhe as atividades e os
                                registros de segurança.
                            </p>
                            <span className="admin-card-status">
                                Em desenvolvimento
                            </span>
                        </article>

                        <article className="admin-card">
                            <span className="admin-card-icone">♧</span>
                            <h3>Gerenciamento de contas</h3>
                            <p>
                                Controle o bloqueio e a reativação
                                de contas.
                            </p>
                            <span className="admin-card-status">
                                Em desenvolvimento
                            </span>
                        </article>

                    </section>

                    {/* LISTAGEM DE USUÁRIOS */}
                    <section className="admin-usuarios">

                        <div className="admin-usuarios-cabecalho">
                            <div>
                                <h2>Usuários cadastrados</h2>
                                <p>
                                    Gerencie e consulte as contas do sistema.
                                </p>
                            </div>

                            <span>
                                Total: {usuarios.length}
                            </span>
                        </div>

                        {/* ESTADOS DA LISTAGEM */}
                        {carregandoUsuarios ? (

                            <p>Carregando usuários...</p>

                        ) : erroUsuarios ? (

                            <p className="admin-erro">
                                {erroUsuarios}
                            </p>

                        ) : usuarios.length === 0 ? (

                            <p>Nenhum usuário cadastrado.</p>

                        ) : (

                            <div className="admin-tabela-container">
                                <table className="admin-tabela">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nome</th>
                                            <th>E-mail</th>
                                            <th>Permissão</th>
                                            <th>Situação</th>
                                            <th>Cadastro</th>
                                            <th>Ações</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {usuarios.map((item) => (
                                            <tr key={item.id_usuario}>
                                                <td>{item.id_usuario}</td>
                                                <td>{item.nome}</td>
                                                <td>{item.email}</td>

                                                <td>
                                                    {item.role === 'admin'
                                                        ? 'Administrador'
                                                        : 'Usuário'}
                                                </td>

                                                <td>
                                                    {Number(item.ativo) === 1
                                                        ? 'Ativo'
                                                        : 'Bloqueado'}
                                                </td>

                                                <td>
                                                    {formatarData(item.data_criacao)}
                                                </td>

                                                <td>
                                                    <button
                                                        type="button"
                                                        className="admin-btn-detalhes"
                                                        onClick={() => consultarUsuario(item.id_usuario)}
                                                        disabled={carregandoDetalhes}
                                                    >
                                                        Ver detalhes
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* CARREGAMENTO DOS DETALHES */}
                        {carregandoDetalhes && (
                            <p>Carregando detalhes do usuário...</p>
                        )}

                        {/* ERRO DOS DETALHES */}
                        {erroDetalhes && (
                            <p className="admin-erro">
                                {erroDetalhes}
                            </p>
                        )}

                        {/* DETALHES DO USUÁRIO */}
                        {usuarioSelecionado && (
                            <div className="admin-detalhes">

                                <div className="admin-detalhes-cabecalho">
                                    <h3>Detalhes do usuário</h3>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setUsuarioSelecionado(null);
                                            setAtividades([]);
                                            setErroAtividades('');
                                            setTotalAtividades(0);
                                            setAtividadesConsultadas(false);
                                        }}
                                    >
                                        Fechar
                                    </button>
                                </div>

                                <p>
                                    <strong>ID:</strong>{' '}
                                    {usuarioSelecionado.id_usuario}
                                </p>

                                <p>
                                    <strong>Nome:</strong>{' '}
                                    {usuarioSelecionado.nome}
                                </p>

                                <p>
                                    <strong>E-mail:</strong>{' '}
                                    {usuarioSelecionado.email}
                                </p>

                                <p>
                                    <strong>Permissão:</strong>{' '}
                                    {usuarioSelecionado.role === 'admin'
                                        ? 'Administrador'
                                        : 'Usuário'}
                                </p>

                                <p>
                                    <strong>Situação:</strong>{' '}
                                    {Number(usuarioSelecionado.ativo) === 1
                                        ? 'Ativo'
                                        : 'Bloqueado'}
                                </p>

                                <p>
                                    <strong>Data de cadastro:</strong>{' '}
                                    {formatarData(usuarioSelecionado.data_criacao)}
                                </p>

                                <hr />

                                
                                {/* HISTÓRICO DE ATIVIDADES */}
                                <div className="admin-atividades">

                                    <h3>Histórico de atividades</h3>

                                    <button
                                        type="button"
                                        onClick={() => consultarAtividades(usuarioSelecionado.id_usuario)}
                                        disabled={carregandoAtividades}
                                    >
                                        {carregandoAtividades
                                            ? 'Carregando atividades...'
                                            : 'Ver atividades'}
                                    </button>

                                    {carregandoAtividades && (
                                        <p>Buscando histórico de atividades...</p>
                                    )}

                                    {erroAtividades && (
                                        <p className="admin-erro">
                                            {erroAtividades}
                                        </p>
                                    )}

                                    {!carregandoAtividades &&
                                        !erroAtividades &&
                                        atividades.length > 0 && (
                                            <>
                                                <p>
                                                    <strong>Total de atividades:</strong>{' '}
                                                    {totalAtividades}
                                                </p>

                                                {/* FILTROS */}
                                                <div className="admin-filtros">

                                                    <div className="admin-filtro">
                                                        <label htmlFor="filtro-acao">
                                                            Tipo de ação
                                                        </label>

                                                        <select
                                                            id="filtro-acao"
                                                            value={filtroAcao}
                                                            onChange={(e) => setFiltroAcao(e.target.value)}
                                                        >
                                                            <option value="">Todas as ações</option>

                                                            {tiposDeAcao.map((acao) => (
                                                                <option key={acao} value={acao}>
                                                                    {acao}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>

                                                    <div className="admin-filtro">
                                                        <label htmlFor="data-inicial">
                                                            Data inicial
                                                        </label>

                                                        <input
                                                            type="date"
                                                            id="data-inicial"
                                                            value={dataInicial}
                                                            onChange={(e) => setDataInicial(e.target.value)}
                                                        />
                                                    </div>

                                                    <div className="admin-filtro">
                                                        <label htmlFor="data-final">
                                                            Data final
                                                        </label>

                                                        <input
                                                            type="date"
                                                            id="data-final"
                                                            value={dataFinal}
                                                            onChange={(e) => setDataFinal(e.target.value)}
                                                            min={dataInicial || undefined}
                                                        />
                                                    </div>

                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setFiltroAcao('');
                                                            setDataInicial('');
                                                            setDataFinal('');
                                                        }}
                                                    >
                                                        Limpar filtros
                                                    </button>

                                                </div>

                                                <p>
                                                    <strong>Registros encontrados:</strong>{' '}
                                                    {atividadesFiltradas.length}
                                                </p>

                                                {/* TABELA */}
                                                {atividadesFiltradas.length > 0 ? (

                                                    <div className="admin-tabela-container">
                                                        <table className="admin-tabela">
                                                            <thead>
                                                                <tr>
                                                                    <th>Ação</th>
                                                                    <th>Descrição</th>
                                                                    <th>Entidade</th>
                                                                    <th>ID relacionado</th>
                                                                    <th>IP</th>
                                                                    <th>Data e hora</th>
                                                                </tr>
                                                            </thead>

                                                            <tbody>
                                                                {atividadesFiltradas.map((item) => (
                                                                    <tr key={item.id_log}>
                                                                        <td>{item.acao}</td>
                                                                        <td>{item.descricao}</td>
                                                                        <td>{item.entidade || '—'}</td>
                                                                        <td>{item.id_entidade ?? '—'}</td>
                                                                        <td>{item.ip || '—'}</td>

                                                                        <td>
                                                                            {item.data_hora
                                                                                ? new Date(
                                                                                    String(item.data_hora).replace(' ', 'T')
                                                                                ).toLocaleString('pt-BR')
                                                                                : '—'}
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>

                                                ) : (

                                                    <p>
                                                        Nenhuma atividade corresponde aos filtros selecionados.
                                                    </p>

                                                )}
                                            </>
                                        )}

                                    {atividadesConsultadas &&
                                        !carregandoAtividades &&
                                        !erroAtividades &&
                                        atividades.length === 0 && (
                                            <p>
                                                Nenhuma atividade registrada para este usuário.
                                            </p>
                                        )}

                                </div>

                            </div>
                        )}

                    </section>
                </main>
            </div>
        </div>
    );
}

export default Admin;
