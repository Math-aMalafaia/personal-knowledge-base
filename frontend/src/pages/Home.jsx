
import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
    return (
        <main className="home">
            <header className="home-header">
                <h1>A Grande Biblioteca</h1>

                <nav>
                    <Link to="/login">Entrar</Link>

                    <Link to="/cadastro" className="btn-cadastro">
                        Criar Conta
                    </Link>
                </nav>
            </header>

            <section className="home-hero">
                <div className="hero-content">
                    <h2>Organize seus livros</h2>

                    <p>
                        Tenha sua biblioteca pessoal organizada em um só lugar.
                        Gerencie seus livros, acompanhe suas leituras e mantenha
                        seus conhecimentos sempre acessíveis.
                    </p>

                    <Link to="/cadastro" className="hero-button">
                        Começar agora
                    </Link>
                </div>
            </section>

            <section className="home-features">
                <h2>Recursos</h2>

                <div className="features-container">
                    <article>
                        <h3>Organizar livros</h3>
                        <p>Cadastre e organize sua coleção pessoal.</p>
                    </article>

                    <article>
                        <h3>Acompanhar leitura</h3>
                        <p>Controle o andamento de sua leitura.</p>
                    </article>

                    <article>
                        <h3>Gerenciar conhecimento</h3>
                        <p>Organize autores e gêneros.</p>
                    </article>
                </div>
            </section>

            <footer className="home-footer">
                <p>A Grande Biblioteca — Organize seus conhecimentos.</p>
            </footer>
        </main>
    )
}

export default Home