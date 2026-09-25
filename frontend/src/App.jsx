import './App.css'
import LivroLista from './components/LivroLista'
import LivroInserir from './components/LivroInserir'

function App() {

  return (
    <div>
      <h1>Meu CRUD de livros</h1>
 
      <LivroLista />
      <LivroInserir />
    </div>
  )
}

export default App
