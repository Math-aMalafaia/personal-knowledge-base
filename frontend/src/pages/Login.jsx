
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUsuario } from '../services/api'
import './Login.css'

function Login() {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const [erro, setErro] = useState('')
    const [carregando, setCarregando] = useState(false)

    async function handleSubmit(event) {
        event.preventDefault()

        setErro('')

        try {
            setCarregando(true)

            await loginUsuario({
                email,
                senha
            })

            // Login realizado: a sessão fica armazenada pelo navegador.
            navigate('/', { replace: true })

        } catch (error) {
            setErro(error.message || 'E-mail ou senha incorretos.')
        } finally {
            setCarregando(false)
        }
    }

    return (
        <main className="login-container">
            <section className="login-card">

                <header className="login-header">
                    <h1>A Grande Biblioteca</h1>
                    <p>Sua jornada literária continua aqui.</p>
                </header>

                <div className="login-conteudo">
                    <h2>Entrar na minha conta</h2>

                    <p className="login-descricao">
                        Informe seus dados para acessar sua biblioteca.
                    </p>

                    <form onSubmit={handleSubmit}>

                        <div className="login-campo">
                            <label htmlFor="email">E-mail</label>

                            <input
                                id="email"
                                type="email"
                                placeholder="seuemail@exemplo.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                                required
                            />
                        </div>

                        <div className="login-campo">
                            <label htmlFor="senha">Senha</label>

                            <input
                                id="senha"
                                type="password"
                                placeholder="Digite sua senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                autoComplete="current-password"
                                required
                            />
                        </div>

                        {erro && (
                            <p className="login-mensagem erro">
                                {erro}
                            </p>
                        )}

                        <button
                            className="login-botao"
                            type="submit"
                            disabled={carregando}
                        >
                            {carregando ? 'Entrando...' : 'Entrar na biblioteca'}
                        </button>

                    </form>

                    <p className="login-cadastro">
                        Ainda não possui uma conta?{' '}
                        <Link to="/cadastro">Criar minha conta</Link>
                    </p>
                </div>

            </section>
        </main>
    )
}

export default Login
