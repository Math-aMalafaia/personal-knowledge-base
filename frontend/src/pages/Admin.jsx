import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Admin.css';

function Admin() {

    const { usuario } = useAuth();

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
                            {usuario?.nome}.
                        </p>
                    </div>

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

                </main>

            </div>

        </div>
    );
}

export default Admin;
