import './App.css'
import LivroLista from './components/LivroLista'
import LivroInserir from './components/LivroInserir'
import LivroEditar from './components/LivroEditar'

function App() {

  return (
    <div>
      <h1>Meu CRUD de livros</h1>
 
      <LivroLista />
      <LivroInserir />
      <LivroEditar />
    </div>
  )
}

export default App
